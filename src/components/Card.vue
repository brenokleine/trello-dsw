<template>
    <div class="w-full h-fit text-white bg-tertiary rounded-md p-3">
        {{ text }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

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

</script>