<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 class="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p class="mb-4">Are you sure you want to delete this board?</p>
            <div class="flex justify-end gap-4">
                <button @click="confirmDelete" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                    Yes, Delete
                </button>
                <button @click="cancelDelete" class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
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