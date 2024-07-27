<template>
    <router-link :to="{ name: 'quadroDetail', params: { id: props.id } }" class="w-64 h-48 m-3 rounded-lg shadow-md flex flex-col hover:cursor-pointer" :style="{ backgroundColor: backgroundColor, color: textColor }">
        <div class="text-2xl font-semibold border-b-2 p-4" :style="{borderColor: textColor}">
            {{ title }}
        </div>
        <div class="w-full h-full flex justify-center items-center font-semibold">
            Lists: {{ lists }}
        </div>
    </router-link>
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

onMounted(() => {
    fetchLists();
});

</script>

