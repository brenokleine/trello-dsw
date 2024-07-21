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
        <div v-if="isModalOpen" @click.prevent="backgroundClick" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3">
                <h2 class="text-xl font-bold mb-4">Add New Board</h2>
                <form @submit.prevent="submitForm">
                    <div class="mb-4">
                        <label for="title" class="block text-sm font-medium text-secondary">Title</label>
                        <input type="text" id="title" v-model="form.title" class="mt-1 p-2 w-full border rounded-lg"
                            required>
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-sm font-medium text-secondary">Description</label>
                        <textarea id="description" v-model="form.description" class="mt-1 p-2 w-full border rounded-lg"
                            required></textarea>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" @click="closeModal"
                            class="mr-4 bg-red-700 hover:bg-red-600 text-white transition ease-linear duration-100 py-2 px-4 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button type="submit"
                            class="bg-tertiary hover:bg-secondary transition ease-linear duration-100 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                            :disabled="form.title.length === 0 || form.description.length === 0"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { supabase } from '@/clients/supabase.js';

const isModalOpen = ref(false);

const form = ref({
    title: '',
    description: ''
});

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    form.value.title = '';
    form.value.description = '';
};

const backgroundClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

const submitForm = () => {
    // Here you can handle the form submission, e.g., save the data to Supabase
    console.log('Form submitted:', form.value);
    addQuadro(form.value.title, form.value.description);
    closeModal();
};

const addQuadro = (title, description) => {
    console.log('Add quadro:', title, description);
    // Add your Supabase logic here to insert a new quadro
    // supabase.from('quadros').insert([{ title, description }])
    //     .then(response => {
    //         console.log('Quadro added:', response);
    //     })
    //     .catch(error => {
    //         console.error('Error adding quadro:', error);
    //     });
};
</script>

