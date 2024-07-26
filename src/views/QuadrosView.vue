<template>
    <div class="flex">
        <!-- Sidebar -->
        <div class="flex h-full">
            <div class="w-56 bg-primary text-white flex flex-col">
                <div class="p-4 border-b border-tertiary">
                    <h1 class="text-xl font-bold">Actions</h1>
                </div>
                <div class="flex-grow p-4">
                    <ul>
                        <li class="mb-4">
                            <button @click.prevent="openModal"
                                class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                                Add New
                            </button>
                        </li>
                        <li>
                            <button class="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
                                Delete All
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- quadros content -->
        <div class="flex-grow bg-secondary"></div>

        <!-- Modal -->
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


                    <!-- fim color picker -->
                    <div class="flex justify-end">
                        <button type="button" @click="closeModal"
                            class="mr-4 bg-red-700 hover:bg-red-600 text-white transition ease-linear duration-100 py-2 px-4 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit"
                            class="bg-tertiary hover:bg-secondary transition ease-linear duration-100 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                            :disabled="form.title.length === 0"
                            @click.prevent="submitForm">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal -->
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { supabase } from '@/clients/supabase.js';
import { ChromePicker } from 'vue-color';

const isModalOpen = ref(false);

const form = ref({
    title: '',
    //cores hardcoded enquanto nao tem color picker
    backgroundColor: '#072242',
    textColor: '#ffffff',
});

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    form.value.title = '';

};

const backgroundClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

const submitForm = () => {
    console.log('Form submitted:', form.value);
    addQuadro({ form: form.value });
    closeModal();
};

const addQuadro = ({ form }) => {
    
    // Add your Supabase logic here to insert a new quadro, related to the user thats logged in
    
    
};
</script>

