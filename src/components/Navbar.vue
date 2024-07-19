<template>
    <nav class="bg-primary p-4 flex justify-between items-center">
        <div class="flex items-center space-x-4 bg-customWhite p-3 rounded-xl">
            <div class="">
                <LogoComponent
                    :width="32"
                    :height="32"
                />
            </div>
            <span class="text-primary text-xl font-semibold">Trello DSW</span>
        </div>
        <button @click="logout" class="bg-red-500 text-white font-semibold rounded-xl p-3 hover:bg-red-800 transition">
            Logout
        </button>
    </nav>
</template>

<script setup>
import LogoComponent from '@/components/LogoComponent.vue';
import { supabase } from '@/clients/supabase.js';

async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(error);
    } else {
        console.log('Logged out');
    }
}

</script>
