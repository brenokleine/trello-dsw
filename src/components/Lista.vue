<template>
    <div class="h-full w-72 bg-quaternary rounded-lg">
        <div class="w-full h-fit">
            <div class="flex flex-col">
                <div v-if="currentUserPermission === 'owner' || currentUserPermission === 'edit'" class="flex flex-nowrap font-semibold">
                    <button @click.prevent="openEditListModal"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-tl-md transition ease-in duration-75">
                        Edit
                    </button>
                    <button @click.prevent="deleteList"
                        class="w-full bg-red-600 hover:bg-red-700 text-white p-1 rounded-tr-md transition ease-in duration-75">
                        Delete
                    </button>
                </div>
                <div v-if="currentUserPermission === 'owner' || currentUserPermission === 'edit'" class="flex flex-nowrap font-semibold">
                    <svg @click.prevent="pushListLeft" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 justify-start w-full hover:bg-gray-500 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <svg @click.prevent="pushListRight" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 justify-end w-full hover:bg-gray-500 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </div>
                <p class="text-2xl font-semibold p-2 border-b border-secondary break-words">
                    {{ title }}
                </p>

            </div>
            <div class="flex justify-between p-2">
                <p class="text-lg font-semibold ">
                    Cards: {{ cards.length }}
                </p>

                <button v-if="currentUserPermission === 'owner' || currentUserPermission === 'edit'" class="bg-green-500 hover:bg-green-700 text-sm font-semibold text-white rounded-full p-2"
                    @click="openCardModal">
                    Add
                </button>
            </div>
        </div>

        <!-- render cards here -->
        <div class="w-full h-fit p-2 flex flex-col gap-3">
            <Card v-for="card in cards" :key="card.id" :currentUserPermission="currentUserPermission" :text="card.text" :id="card.id" :ultima_alteracao="card.ultima_alteracao" :created_at="card.created_at"
                @openEditCardModal="openEditCardModal" @deleteCard="deleteCard" @pushCardLeft="pushCardLeft" @pushCardRight="pushCardRight" />
        </div>

        <!-- Add Card Modal -->
        <div v-if="isCardModalOpen" @click.prevent="backgroundClick"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3">
                <h2 class="text-xl font-bold mb-4">Add Card</h2>
                <div>
                    <div class="mb-4">
                        <label for="text" class="block text-sm font-medium text-secondary">Text</label>
                        <input type="text" id="text" v-model="form.text" class="mt-1 p-2 w-full border rounded-lg"
                            required>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" @click="closeCardModal"
                            class="mr-4 bg-red-700 hover:bg-red-600 text-white transition ease-linear duration-100 py-2 px-4 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit"
                            class="bg-green-500 hover:bg-green-700 transition ease-linear duration-100 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                            :disabled="form.text.length === 0" @click.prevent="addCard">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal -->

        <EditCardModal v-if="isEditCardModalOpen" :id="idToEdit" :text="textToEdit" @cancelEditCard="cancelEditCard" @confirmEditCard="confirmEditCard" />
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted, defineEmits } from 'vue';
import { supabase } from '@/clients/supabase.js';
import Card from '@/components/Card.vue';
import EditCardModal from '@/components/EditCardModal.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    currentUserPermission: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['openEditListModal', 'deleteList']);

const cards = ref([]);

const isCardModalOpen = ref(false);

const isEditCardModalOpen = ref(false);

const idToEdit = ref(null);
const textToEdit = ref('');

const form = ref({
    text: '',
});

const openEditCardModal = ({id, text}) => {
    idToEdit.value = id;
    textToEdit.value = text;
    isEditCardModalOpen.value = true;
};

const cancelEditCard = () => {
    isEditCardModalOpen.value = false;
    idToEdit.value = null;

};

const confirmEditCard = async ({ id, text }) => {
    try {
        const { data, error } = await supabase
            .from('cartoes')
            .update({ text, ultima_alteracao: new Date() })
            .eq('id', id);
        if (error) throw error;
        console.log('Card updated successfully');
    } catch (error) {
        console.error('Error updating card:', error.message);
    }

    isEditCardModalOpen.value = false;
    idToEdit.value = null;
    fetchCards();
};

const openCardModal = () => {
    isCardModalOpen.value = true;
};

const closeCardModal = () => {
    isCardModalOpen.value = false;
};

const backgroundClick = (event) => {
    if (event.target === event.currentTarget) {
        closeCardModal();
    }
};

const fetchCards = async () => {
    const { data, error } = await supabase
        .from('cartoes')
        .select('*')
        .eq('lista_id', props.id)
        .order('created_at', { ascending: true });
    if (error) {
        console.error('Error fetching cards:', error.message);
    } else {
        console.log('Cards:', data);
    }

    cards.value = data;
};

const addCard = async () => {
    try {
        const { data, error } = await supabase
            .from('cartoes')
            .insert({
                text: form.value.text,
                lista_id: props.id
            });
        if (error) throw error;
        console.log('Card added successfully');
        fetchCards();
    } catch (error) {
        console.error('Error adding card:', error.message);
    }

    form.value.text = '';
    closeCardModal();
};

const deleteCard = async (id) => {
    try {
        const { error } = await supabase
            .from('cartoes')
            .delete()
            .eq('id', id);
        if (error) throw error;
        console.log('Card deleted successfully');
        fetchCards();
    } catch (error) {
        console.error('Error deleting card:', error.message);
    }

    await fetchCards();
};

const openEditListModal = () => {
    emit('openEditListModal', props.id);
};

const deleteList = () => {
    emit('deleteList', props.id);
};

const pushListLeft = () => {
    emit('pushListLeft', props.id);
};

const pushListRight = () => {
    emit('pushListRight', props.id);
};

const pushCardLeft = (id) => {
    const card = cards.value.find(c => c.id === id);
    emit('pushCardLeft', card);
};

const pushCardRight = (id) => {
    const card = cards.value.find(c => c.id === id);
    emit('pushCardRight', card);
};

onMounted(async () => {
   await fetchCards();
});

</script>