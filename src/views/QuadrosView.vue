<template>
    <div class="flex">
        <!-- Sidebar -->
        <Sidebar :openModal="openModal" :mode="'Board'" />
        <!-- quadros content -->
        <div class="bg-secondary w-full ">
            <div class="flex flex-wrap">
                <Quadro v-for="quadro in quadros" :key="quadro.id" :id="quadro.id" :permission="quadro.permission" :title="quadro.title"
                    :backgroundColor="quadro.bg_color" :textColor="quadro.text_color" :isFavourite="quadro.isFavourite" @openDeleteModal="openDeleteModal"
                    @openEditModal="openEditModal" @favouriteBoard="favouriteBoard" @openPdfModal="openPdfModal" />
            </div>
        </div>

        <!-- Add Quadro Modal -->
        <div v-if="isModalOpen" @click.prevent="backgroundClick"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3">
                <h2 class="text-xl font-bold mb-4">Add New Board</h2>
                <div>
                    <div class="mb-4">
                        <label for="title" class="block text-sm font-medium text-secondary">Title</label>
                        <input type="text" id="title" v-model="form.title" class="mt-1 p-2 w-full border rounded-lg"
                            required>
                    </div>
                    <!-- color picker aqui -->
                    <div class="flex flex-col mb-3 gap-3">
                        <DxColorBox v-model="form.backgroundColor" :input-attr="defaultModeLabel" />
                        <DxColorBox v-model="form.textColor" :input-attr="defaultModeLabel" />
                    </div>
                    <!-- fim color picker -->
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

        <DeleteQuadroModal v-if="isDeleteModalOpen" :quadroId="idToDelete" @confirmDelete="deleteBoard"
            @cancelDelete="closeDeleteModal" />

        <EditQuadroModal v-if="isEditModalOpen" :id="idToEdit" :title="titleToEdit" :bg_color="bgColorToEdit"
            :text_color="textColorToEdit" @cancelEdit="cancelEdit" @confirmEdit="confirmEdit" />

        <PdfModal v-if="isPdfModalOpen" :nomeQuadro="boardNameForPdf" @closePdfModal="closePdfModal"
            @addPdf="addPdf"/>

    </div>
</template>


<script setup>

import { ref, onMounted } from 'vue';
import { supabase } from '@/clients/supabase.js';
import Quadro from '@/components/Quadro.vue';
import Sidebar from '@/components/Sidebar.vue';
import DeleteQuadroModal from '@/components/DeleteQuadroModal.vue';
import EditQuadroModal from '@/components/EditQuadroModal.vue';
import PdfModal from '@/components/PdfModal.vue';
import 'devextreme/dist/css/dx.light.css';
import DxColorBox from 'devextreme-vue/color-box';

const isModalOpen = ref(false);

const isDeleteModalOpen = ref(false);
const idToDelete = ref(null);

const isPdfModalOpen = ref(false);
const boardNameForPdf = ref('');

const isEditModalOpen = ref(false);
const idToEdit = ref(null);
const titleToEdit = ref('');
const bgColorToEdit = ref('');
const textColorToEdit = ref('');

const currentUser = ref(null);

const form = ref({
    title: '',
    //cores hardcoded enquanto nao tem color picker
    backgroundColor: '#03fcdb',
    textColor: '#000000',
});

const quadros = ref([]);
const quadrosCompartilhados = ref([]);

const fetchCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();

    currentUser.value = data.user;

    console.log('Current user:', currentUser.value);
}

const openDeleteModal = (id) => {
    idToDelete.value = id;
    isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false;
    idToDelete.value = null;
};

const openPdfModal = (boardName) => {
    boardNameForPdf.value = boardName;
    isPdfModalOpen.value = true;
};


const closePdfModal = () => {
    isPdfModalOpen.value = false;
    boardNameForPdf.value = '';
};

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    form.value.title = '';
};

const openEditModal = (id) => {
    const quadro = quadros.value.find(q => q.id === id);
    idToEdit.value = quadro.id;
    titleToEdit.value = quadro.title;
    bgColorToEdit.value = quadro.bg_color;
    textColorToEdit.value = quadro.text_color;
    isEditModalOpen.value = true;
};

const cancelEdit = () => {
    isEditModalOpen.value = false;
    idToEdit.value = null;
    titleToEdit.value = '';
    bgColorToEdit.value = '';
    textColorToEdit.value = '';
};

const confirmEdit = async ({ id, title, bg_color, text_color }) => {
    try {
        const { data, error } = await supabase
            .from('quadros')
            .update({ title, bg_color, text_color })
            .eq('id', id);
        if (error) throw error;
        console.log('Quadro updated successfully');
        fetchQuadros();
    } catch (error) {
        console.error('Error updating quadro:', error.message);
    }
    cancelEdit();

    return data;
};

const backgroundClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

const submitForm = async () => {
    console.log('Form submitted:', form.value);
    await addQuadro({ form: form.value });
    closeModal();
};

const addQuadro = async ({ form }) => {
    //get current user logged in
    const { data: userData } = await supabase.auth.getUser();

    try {
        const { data, error } = await supabase
            .from('quadros')
            .insert([
                {
                    title: form.title,
                    bg_color: form.backgroundColor,
                    text_color: form.textColor,
                    creator_id: userData.user.id
                }
            ]);
        if (error) throw error;
        console.log('Quadro added successfully');
    } catch (error) {
        console.error('Error adding quadro:', error.message);
    }

    fetchQuadros();

};

const deleteBoard = async (id) => {
    const { error } = await supabase
        .from('quadros')
        .delete()
        .eq('id', id);
    if (error) {
        console.error('Error deleting board:', error.message);
    } else {
        console.log('Board deleted successfully');
        fetchQuadros();
    }

    closeDeleteModal();
};

const favouriteBoard = async ({ id, isFavourite }) => {
    const userEmail = currentUser.value.email;

    // Busca o quadro pelo ID e trata o caso de 'favourited_users' ser null
    const quadro = quadros.value.find(q => q.id === id);
    let favouritedUsers = quadro.favourited_users || [];

    // Adiciona ou remove o userEmail de 'favourited_users' baseado em 'isFavourite'
    if (isFavourite) {
        // Adiciona se ainda não estiver na lista
        if (!favouritedUsers.includes(userEmail)) {
            favouritedUsers.push(userEmail);
        }
    } else {
        // Remove se estiver na lista
        favouritedUsers = favouritedUsers.filter(email => email !== userEmail);
    }

    try {
        // Atualiza 'favourited_users' no banco de dados
        const { error } = await supabase
            .from('quadros')
            .update({ favourited_users: favouritedUsers })
            .eq('id', id);
        if (error) throw error;
        console.log('Board updated successfully');
        fetchQuadros();
    } catch (error) {
        console.error('Error updating board:', error.message);
    }
};

const fetchQuadros = async () => {
    const { data, error } = await supabase
        .from('quadros')
        .select('*')
        .order('id', { ascending: true });
    if (error) {
        console.error('Error fetching quadros:', error.message);
    } else {
        const filteredData = data.map(quadro => {
            // Verifica se o quadro foi criado pelo usuário atual
            if (quadro.creator_id === currentUser.value.id) {
                return quadro;
            }

            // Verifica se o quadro está compartilhado com o usuário atual
            const permittedUser = quadro.permitted_users &&
                quadro.permitted_users.find(user => user.email === currentUser.value.email);

            if (permittedUser) {
                // Adiciona o campo "permission" com o valor correspondente
                return { ...quadro, permission: permittedUser.permission };
            }

            return null; // Filtra quadros que não estão relacionados ao usuário
        }).filter(quadro => quadro !== null); // Remove quadros que não passaram nos filtros

        console.log("DADOS")
        console.log(filteredData)

        quadros.value = filteredData;
        quadros.value.forEach(quadro => {
            if(quadro.favourited_users != null && quadro.favourited_users.includes(currentUser.value.email)) {
                quadro.isFavourite = true;
            }
        });
    }
};

onMounted(async () => {
    await fetchCurrentUser();
    await fetchQuadros();
});
</script>
