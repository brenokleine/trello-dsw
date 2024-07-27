<template>
    <div>
        <h1>Quadro Detail</h1>
        <p>Details for Quadro ID: {{ id }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id);

const fetchDetails = async () => {
    console.log('Fetching details for Quadro ID:', id.value);
    // Fetch and display details for this specific ID
};

onMounted(() => {
    fetchDetails();
});

watch(() => route.params.id, (newId) => {
    id.value = newId;
    fetchDetails();
});
</script>

