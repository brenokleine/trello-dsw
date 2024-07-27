<template>
    <div class="w-96 m-3 flex-shrink-0 rounded-lg shadow-md"
        :style="{ backgroundColor: backgroundColor, color: textColor }">
        <div class="text-2xl font-semibold border-b-2 p-4" :style="{borderColor: textColor}">
            {{ title }}
        </div>
        <!-- Content goes here if needed -->
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    backgroundColor: {
        type: String,
        default: '#FFFFFF' // Default background color (white)
    },
    textColor: {
        type: String,
        default: '#000000' // Default text color (black)
    }
});
</script>

