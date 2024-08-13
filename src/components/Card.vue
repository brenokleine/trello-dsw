<template>
    <div class="w-full h-fit text-white bg-tertiary rounded-md flex flex-col ">
        <div class="border-b border-secondary p-2">
            <div class="flex flex-nowrap gap-2 font-semibold">
                <button @click.prevent="openEditCardModal"
                    class="w-full bg-secondary hover:bg-primary text-white p-1 rounded-md transition ease-in duration-75">
                    Edit
                </button>
                <button @click.prevent="deleteCard"
                    class="w-full bg-red-500 hover:bg-red-600 text-white p-1 rounded-md transition ease-in duration-75">
                    Delete
                </button>
            </div>
        </div>
        <div class="p-3 font-semibold break-words">
            {{ text }}
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['openEditCardModal', 'deleteCard']);

const openEditCardModal = () => {
    emit('openEditCardModal', {
        id: props.id,
        text: props.text
    });
};

const deleteCard = () => {
    emit('deleteCard', props.id);
};

</script>