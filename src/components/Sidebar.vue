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
                    <div v-if="contributors.length > 0" class="flex flex-col pt-4">
                        <p class="text-lg font-semibold">
                            Contributors: {{ contributors.length }}
                        </p>
                        <div class="flex flex-col gap-1 pt-2 font-semibold">
                            <p class="text-lg">
                                Edit:
                            </p>
                            <div v-for="contributor in contributors" :key="contributor.email">
                                <p v-if="contributor.permission == 'edit'" class="italic font-normal text-white">
                                    {{ contributor.email }}
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1 pt-2 font-semibold">
                            <p class="text-lg">
                                Read:
                            </p>
                            <div v-for="contributor in contributors" :key="contributor.email">
                                <p v-if="contributor.permission == 'read'" class="italic font-normal text-white">
                                    {{ contributor.email }}
                                </p>
                            </div>
                        </div>

                    </div>
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
    contributors: {
        type: Array,
        required: false,
    },
});

const emit = defineEmits(['openContributorModal']);

const openContributorModal = () => {
    emit('openContributorModal', props.id);
};

</script>