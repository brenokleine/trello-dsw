<template>
    <div class="w-full h-full bg-primary text-customWhite flex justify-center items-center">
        <div class="font-semibold text-3xl flex flex-col items-center gap-8">
            <div class="bg-customWhite rounded-full p-6">
                <logoComponent />
            </div>
            <h1>
                Trello DSW 2024.1
            </h1>
            <h2>
                Breno Bernstein, Luiz Otavio Navarro e Breno Borges
            </h2>
            <RouterLink to="/login" class="bg-customWhite text-primary rounded-lg p-2
                         hover:cursor-pointer hover:bg-tertiary hover:text-customWhite
                         p-4 transition ease-in duration-100
                         ">
                Start
            </RouterLink>
        </div>

    </div>
</template>

<script setup>
import logoComponent from '@/components/logoComponent.vue';

</script>
