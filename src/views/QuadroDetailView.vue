<template>
    <div class="flex flex-nowrap bg-secondary w-full overflow-auto">
        <Sidebar :openModal="openModal" @openContributorModal="openContributorModal"
            :currentUserPermission="currentUserPermission" :contributors="contributorsArray" :mode="'List'" />

        <!-- content -->
        <div class="flex flex-col w-full">
            <div class="p-3 pr-5 border-b border-r rounded-br-xl border-tertiary bg-primary w-fit">
                <h1 class="text-3xl font-bold text-white">Board: {{ quadroDetails.title }}</h1>
            </div>
            <div class="w-full h-full flex gap-4 p-3">
                <Lista v-for="lista in quadroLists" :key="lista.id" :title="lista.title" :id="lista.id"
                    :currentUserPermission="currentUserPermission" @openEditListModal="openEditListModal"
                    @deleteList="deleteList" @pushListLeft="pushListLeft" @pushListRight="pushListRight"
                    @pushCardLeft="pushCardLeft" @pushCardRight="pushCardRight" />
            </div>
        </div>


        <!-- Add Lista Modal -->
        <div v-if="isModalOpen" @click.prevent="backgroundClick"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3">
                <h2 class="text-xl font-bold mb-4">Add New List</h2>
                <div>
                    <div class="mb-4">
                        <label for="title" class="block text-sm font-medium text-secondary">Title</label>
                        <input type="text" id="title" v-model="form.title" class="mt-1 p-2 w-full border rounded-lg"
                            required>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" @click="closeModal"
                            class="mr-4 bg-red-700 hover:bg-red-600 text-white transition ease-linear duration-100 py-2 px-4 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit"
                            class="bg-tertiary hover:bg-secondary transition ease-linear duration-100 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                            :disabled="form.title.length === 0" @click.prevent="submitForm">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal -->

        <EditListModal v-if="isEditModalOpen" :id="idToEdit" :title="titleToEdit" @cancelEditList="cancelEditList"
            @confirmEditList="confirmEditList" />

        <AddContributorModal v-if="isContributorModalOpen" @cancelContributorAdd="cancelContributorAdd"
            @confirmContributorAdd="confirmContributorAdd" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '@/clients/supabase.js';
import Sidebar from '@/components/Sidebar.vue';
import Lista from '@/components/Lista.vue';
import EditListModal from '@/components/EditListModal.vue';
import AddContributorModal from '@/components/AddContributorModal.vue';

const route = useRoute();
const id = ref(route.params.id);

const isModalOpen = ref(false);

const isContributorModalOpen = ref(false);

const idToEdit = ref(null);
const titleToEdit = ref('');
const isEditModalOpen = ref(false);

const quadroDetails = ref({});

const quadroLists = ref([]);

const form = ref({
    title: '',
});

const contributorsArray = ref([]);

const currentUserPermission = ref('');

const currentUserEmail = ref('');

const fetchDetails = async () => {
    const { data, error } = await supabase
        .from('quadros')
        .select('*')
        .eq('id', id.value)
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching quadro details:', error.message);
    }

    contributorsArray.value = data[0].permitted_users || [];
    quadroDetails.value = data[0];
};

const fetchLists = async () => {
    const { data, error } = await supabase
        .from('listas')
        .select('*')
        .eq('quadro_id', quadroDetails.value.id)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching lists:', error.message);
    }

    quadroLists.value = data;
};

const openModal = () => {
    isModalOpen.value = true;
};

const backgroundClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

const closeModal = () => {
    isModalOpen.value = false;
};

const submitForm = async () => {
    const { data, error } = await supabase
        .from('listas')
        .insert([
            {
                title: form.value.title,
                quadro_id: quadroDetails.value.id,
            },
        ]);

    if (error) {
        console.error('Error inserting new list:', error.message);
    }

    form.value.title = '';
    fetchLists();
    closeModal();
};

const openEditListModal = (id) => {
    const lista = quadroLists.value.find(l => l.id === id);
    idToEdit.value = lista.id;
    titleToEdit.value = lista.title;
    isEditModalOpen.value = true;
};

const cancelEditList = () => {
    isEditModalOpen.value = false;
    idToEdit.value = null;
    titleToEdit.value = '';
};

const confirmEditList = async ({ id, title }) => {
    try {
        const { data, error } = await supabase
            .from('listas')
            .update({ title })
            .eq('id', id);
        if (error) throw error;
        fetchLists();
    } catch (error) {
        console.error('Error updating list:', error.message);
    }

    cancelEditList();
    await fetchLists();
};

const deleteList = async (id) => {
    try {
        const { data, error } = await supabase
            .from('listas')
            .delete()
            .eq('id', id);
        if (error) throw error;
        fetchLists();
    } catch (error) {
        console.error('Error deleting list:', error.message);
    }

    await fetchLists();
};

const pushListLeft = (id) => {
    const list = quadroLists.value.find(l => l.id === id);
    const index = quadroLists.value.indexOf(list);

    if (index === 0) {
        return;
    }

    const previousList = quadroLists.value[index - 1];

    const temp = list.created_at;
    list.created_at = previousList.created_at;
    previousList.created_at = temp;

    quadroLists.value[index] = previousList;
    quadroLists.value[index - 1] = list;

    updateListOrder(list, previousList);
};

const pushListRight = (id) => {
    const list = quadroLists.value.find(l => l.id === id);
    const index = quadroLists.value.indexOf(list);

    if (index === quadroLists.value.length - 1) {
        return;
    }

    const nextList = quadroLists.value[index + 1];

    const temp = list.created_at;
    list.created_at = nextList.created_at;
    nextList.created_at = temp;

    quadroLists.value[index] = nextList;
    quadroLists.value[index + 1] = list;

    updateListOrder(list, nextList);
};

const updateListOrder = async (list1, list2) => {
    try {
        const { data, error } = await supabase
            .from('listas')
            .update([
                { created_at: list1.created_at },
                { created_at: list2.created_at },
            ]);
        if (error) throw error;
    } catch (error) {
        console.error('Error updating list order:', error.message);
    }
};

const pushCardLeft = (card) => {
    const list = quadroLists.value.find(l => l.id === card.lista_id);
    const index = quadroLists.value.indexOf(list);

    if (index === 0) {
        return;
    }

    const previousList = quadroLists.value[index - 1];

    card.lista_id = previousList.id;

    updateCardList(card);
};

const pushCardRight = (card) => {
    const list = quadroLists.value.find(l => l.id === card.lista_id);
    const index = quadroLists.value.indexOf(list);

    if (index === quadroLists.value.length - 1) {
        return;
    }

    const nextList = quadroLists.value[index + 1];

    card.lista_id = nextList.id;

    updateCardList(card);
};

const updateCardList = async (card) => {
    try {
        const { error } = await supabase
            .from('cartoes')
            .update({ lista_id: card.lista_id })
            .eq('id', card.id);

        location.reload();
        if (error) throw error;
    } catch (error) {
        console.error('Error updating card list:', error.message);
    }
};

const openContributorModal = () => {
    isContributorModalOpen.value = true;
};

const cancelContributorAdd = () => {
    isContributorModalOpen.value = false;
};

const confirmContributorAdd = async ( {email, permission} ) => {

    const contributor = {
        email: email,
        permission: permission
    }

    

    if(currentUserEmail === contributor.email){
        window.alert('You cannot add yourself as a contributor');
        return;
    }

    const permitted_users = quadroDetails.value.permitted_users || [];

    if(permitted_users.some(user => user.email === contributor.email)){
        window.alert('User already in the list');
        return;
    }

    const updated_permitted_users = [...permitted_users, contributor];

    try {
        const { data, error } = await supabase
            .from('quadros')
            .update({ permitted_users: updated_permitted_users })
            .eq('id', quadroDetails.value.id);
        if (error) throw error;
        console.log('Contributor added successfully');
    } catch (error) {
        console.error('Error adding contributor:', error.message);
    }

    isContributorModalOpen.value = false;
    await fetchDetails();
    await fetchLists();
};


onMounted(async () => {
    await fetchDetails();
    await fetchLists();
    
    currentUserEmail.value = (await supabase.auth.getUser()).data.user.email;

    if(quadroDetails.value.creator_id === (await supabase.auth.getUser()).data.user.id){
        currentUserPermission.value = 'owner';
    } else {
        quadroDetails.value.permitted_users.forEach(user => {
            if(user.email === currentUserEmail.value){
                currentUserPermission.value = user.permission;
            }
        });
    }
});

</script>

<!-- quadro details schema:
data: [
    {
    id: 5,
    created_at: '2024-07-26T23:45:33.38988+00:00',
    title: 'segundo',
    bg_color: '#072242',
    creator_id: '02318bc7-6e88-408f-848b-40f2be3d01b3',
    text_color: '#ffffff'
    }
] -->