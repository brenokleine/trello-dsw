<template>
    <div class="w-64 h-48 m-3 rounded-lg shadow-md hover:scale-105 duration-75 "
        :style="{ backgroundColor: backgroundColor, color: textColor }">
        <router-link :to="{ name: 'quadroDetail', params: { id: props.id } }"
            class="flex flex-col h-5/6 hover:cursor-pointer">
            <div class=" w-full text-2xl font-semibold border-b-2 p-4" :style="{borderColor: textColor}">
                <p class="w-full truncate">{{ title }}</p>
            </div>
            <div class="flex flex-row w-full justify-between">
                <div class="p-1">
                    <svg @click.prevent="favouriteBoard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :style="{ fill: isFavourite ? 'yellow' : 'gray' }" class="size-6 hover:bg-gray-700">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div>
                    <svg @click.prevent="openPdfModal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hover:bg-gray-700">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                    </svg>
                </div>
            </div>
            <div class="w-full h-full flex justify-center items-center font-semibold">
                Lists: {{ lists }}
            </div>
        </router-link>
        <div class="flex flex-nowrap">
            <button @click.prevent="openDeleteModal"
                class="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-bl-lg">
                Delete
            </button>
            <button @click.prevent="openEditModal"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-br-lg">
                Edit
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted, defineEmits } from 'vue';
import { supabase } from '@/clients/supabase.js';

const lists = ref(0);
const showModal = ref(false);
const showPdfModal = ref(false);

const emit = defineEmits(['openDeleteModal', 'openEditModal', 'openPdfModal']);

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    backgroundColor: {
        type: String,
        default: '#FFFFFF'
    },
    textColor: {
        type: String,
        default: '#000000'
    },
    id: {
        type: Number,
        required: true
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    pdfPath: {
        type: String,
        default: ''
    }
});

// fetches the number of lists in the board, by id
const fetchLists = async () => {
    const { data, error } = await supabase
        .from('listas')
        .select('id')
        .eq('quadro_id', props.id);
    if (error) {
        console.error('Error fetching lists:', error.message);
    } else {
        lists.value = data.length;
    }
};

const openDeleteModal = () => {
   emit('openDeleteModal', props.id);
};

const openEditModal = () => {
    emit('openEditModal', props.id);
};

const favouriteBoard = () => {
    emit('favouriteBoard', {id: props.id, isFavourite: !props.isFavourite});
};

const openPdfModal = () => {
    emit('openPdfModal', props.title);
};

onMounted(() => {
    fetchLists();
});

</script>
