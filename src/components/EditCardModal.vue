<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3">
            <h2 class="text-xl font-bold mb-4">Edit Card</h2>
            <div>
                <div class="mb-4">
                    <label for="text" class="block text-sm font-medium text-secondary">Text</label>
                    <input type="text" id="text" v-model="form.text" class="mt-1 p-2 w-full border rounded-lg"
                        required>
                </div>
                <div class="flex justify-end">
                    <button type="button" @click="cancelEditCard"
                        class="mr-4 bg-red-600 hover:bg-red-700 text-white transition ease-in duration-75 py-2 px-4 rounded-lg">
                        Cancel
                    </button>
                    <button type="submit"
                        class="bg-green-500 hover:bg-green-600 transition ease-in duration-75 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                        :disabled="form.text.length === 0" @click.prevent="confirmEditCard">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';

const emit = defineEmits(['cancelEditCard', 'confirmEditCard']);

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
});

const form = ref({
    text: props.text,
});

const cancelEditCard = () => {
    emit('cancelEditCard');
};

const confirmEditCard = () => {
    emit('confirmEditCard', {
        id: props.id,
        text: form.value.text,
    });
};


</script>