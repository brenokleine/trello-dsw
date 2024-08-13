<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3">
            <h2 class="text-xl font-bold mb-4">Edit List</h2>
            <div>
                <div class="mb-4">
                    <label for="title" class="block text-sm font-medium text-secondary">Title</label>
                    <input type="text" id="title" v-model="form.title" class="mt-1 p-2 w-full border rounded-lg"
                        required>
                </div>
                <div class="flex justify-end">
                    <button type="button" @click="cancelEditList"
                        class="mr-4 bg-red-600 hover:bg-red-700 text-white transition ease-in duration-75 py-2 px-4 rounded-lg">
                        Cancel
                    </button>
                    <button type="submit"
                        class="bg-green-500 hover:bg-green-600 transition ease-in duration-75 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                        :disabled="form.title.length === 0" @click.prevent="confirmEditList">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';

const emit = defineEmits(['cancelEditList', 'confirmEditList']);

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
});

const form = ref({
    title: props.title,
});

const cancelEditList = () => {
    emit('cancelEditList');
};

const confirmEditList = () => {
    emit('confirmEditList', {
        id: props.id,
        title: form.value.title,
    });
};


</script>