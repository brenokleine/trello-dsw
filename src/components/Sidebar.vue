<template>
    <div class="flex h-full">
        <div class="w-56 bg-primary text-white flex flex-col">
            <div class="p-4 border-b border-tertiary">
                <h1 class="text-xl font-bold">{{ mode }} Actions</h1>
            </div>
            <div class="flex flex-col flex-grow p-4">
                <div class="mb-4">
                    <button @click.prevent="openModal"
                        class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                        Add New {{ mode }}
                    </button>
                </div>
                <div v-if="mode == 'List'" class="mb-4">
                    <button @click.prevent="openContributorModal"
                        class="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
                        Add Contributor
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    openModal: {
        type: Function,
        required: true,
    },
    id: {
        type: String,
        required: false,
    },
    mode: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['openContributorModal']);

const openContributorModal = () => {
    emit('openContributorModal', props.id);
};

</script>