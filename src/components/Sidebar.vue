<template>
    <div class="flex h-full">
        <div class="w-56 bg-primary text-white flex flex-col">
            <div class="p-4 border-b border-tertiary">
                <h1 class="text-xl font-bold">Actions</h1>
            </div>
            <div class="flex-grow p-4">
                <div class="mb-4">
                    <button @click.prevent="openModal"
                        class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                        Add New
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    openModal: Function,
});

</script>