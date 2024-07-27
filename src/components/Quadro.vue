<template>
    <div class="w-64 h-48 m-3 rounded-lg shadow-md" :style="{ backgroundColor: backgroundColor, color: textColor }">
        <router-link :to="{ name: 'quadroDetail', params: { id: props.id } }"
            class="flex flex-col h-5/6 hover:cursor-pointer">
            <div class="text-2xl font-semibold border-b-2 p-4" :style="{borderColor: textColor}">
                {{ title }}
            </div>
            <div class="w-full h-full flex justify-center items-center font-semibold">
                Lists: {{ lists }}
            </div>
        </router-link>
        <button @click.prevent="deleteBoard" 
        class="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-b-lg border border-white">
            Delete
        </button>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { supabase } from '@/clients/supabase.js';

const lists = ref(0);

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

const deleteBoard = async () => {
    const { error } = await supabase
        .from('quadros')
        .delete()
        .eq('id', props.id);
    if (error) {
        console.error('Error deleting board:', error.message);
    } else {
        console.log('Board deleted successfully');
    }
};

onMounted(() => {
    fetchLists();
});

</script>

