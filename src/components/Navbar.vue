<template>
    <nav class="bg-primary p-4 flex justify-between items-center">
        <div class="flex flex-nowrap gap-4">
            <RouterLink to="/" class="flex items-center space-x-4 bg-customWhite p-3 rounded-xl">
                <div class="">
                    <LogoComponent :width="32" :height="32" />
                </div>
                <span class="text-primary text-xl font-semibold">Trello DSW</span>
            </RouterLink>
            <RouterLink to="/quadros"
                class="flex items-center bg-tertiary hover:bg-customWhite hover:text-primary transition ease-in text-white font-semibold p-3 rounded-xl"
            >
                <p>
                    Quadros
                </p>
            </RouterLink>
        </div>
        <button @click="logout" class="bg-red-500 text-white font-semibold rounded-xl p-3 hover:bg-red-800 transition">
            Logout
        </button>
    </nav>
</template>

<script setup>
import LogoComponent from '@/components/LogoComponent.vue';
import { supabase } from '@/clients/supabase.js';
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';

const router = useRouter();

async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(error);
    } else {
        console.log('Logged out');
    }

    router.push('/login');
}

</script>
