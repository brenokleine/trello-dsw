<template>
    <div class="w-full h-fit text-white bg-tertiary rounded-md flex flex-col ">
        <div v-if="currentUserPermission === 'owner' || currentUserPermission === 'edit'" class="border-b border-secondary p-2">
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
            <div class="flex flex-nowrap font-semibold">
                <svg @click="pushCardLeft" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 justify-start w-full hover:bg-violet-700 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <svg @click="pushCardRight" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 justify-end w-full hover:bg-violet-700 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </div>
        </div>
        <div class="flex flex-col">
            <div
                class="text-white text-xs italic font-medium flex flex-nowrap justify-between p-2 border-b border-secondary">
                <p>
                    Created At:
                </p>
                <p>
                    {{ new Date(created_at).toLocaleString() }}
                </p>
            </div>
            <div v-if="ultima_alteracao"
                class="text-white text-xs italic font-medium flex flex-nowrap justify-between p-2 border-b border-secondary">
                <p>
                    Last Edited:
                </p>
                <p>
                    {{ new Date(ultima_alteracao).toLocaleString() }}
                </p>
            </div>
            <p class="p-3 font-semibold break-words">
                {{ text }}
            </p>
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
    },
    ultima_alteracao: {
        type: String,
        required: false
    },
    created_at: {
        type: String,
        required: true
    },
    currentUserPermission: {
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

const pushCardLeft = () => {
    emit('pushCardLeft', props.id);
};

const pushCardRight = () => {
    emit('pushCardRight', props.id);
};

</script>