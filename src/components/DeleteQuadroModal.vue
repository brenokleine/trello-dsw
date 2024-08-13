<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3">
            <h3 class="text-xl font-bold mb-4">Confirm Delete</h3>
            <p class="mb-4">Are you sure you want to delete this board?</p>
            <div class="flex justify-end gap-4">
                <button @click="confirmDelete"
                    class="bg-red-600 hover:bg-red-700 transition ease-in duration-75 text-white py-2 px-4 rounded-lg">
                    Yes, Delete
                </button>
                <button @click="cancelDelete"
                    class=" bg-tertiary hover:bg-secondary transition ease-in duration-75 text-white py-2 px-4 rounded-lg">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['confirmDelete', 'cancelDelete']);

const props = defineProps({
    quadroId: {
        type: Number,
        required: true
    }
});

const confirmDelete = () => {
    emit('confirmDelete', props.quadroId);
};

const cancelDelete = () => {
    emit('cancelDelete');
};

</script>