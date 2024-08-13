<template>
    <div class="w-64 h-48 m-3 rounded-lg shadow-md hover:scale-110 duration-75 "
        :style="{ backgroundColor: backgroundColor, color: textColor }">
        <router-link :to="{ name: 'quadroDetail', params: { id: props.id } }"
            class="flex flex-col h-5/6 hover:cursor-pointer">
            <div class="text-2xl font-semibold border-b-2 p-4" :style="{borderColor: textColor}">
                {{ title }}
            </div>
            <div class="w-full h-full flex justify-center items-center font-semibold">
                Lists: {{ lists }}
            </div>
        </router-link>
        <div class="flex flex-nowrap">
            <button @click.prevent="openDeleteModal"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-bl-lg border border-white">
                Delete
            </button>
            <button @click.prevent="openEditModal"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-br-lg border border-white">
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

const emit = defineEmits(['openDeleteModal', 'openEditModal']);

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

onMounted(() => {
    fetchLists();
});

</script>

