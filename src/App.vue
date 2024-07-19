<template>
  <div class="flex flex-col h-full">
    <Navbar />
    <RouterView class="flex-1" />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>