<template>
    <nav class="bg-primary p-4 flex justify-between items-center">
        <div class="flex flex-nowrap gap-4">
            <RouterLink to="/" class="flex items-center space-x-4 bg-customWhite p-3 rounded-xl">
                <div class="">
                    <LogoComponent :width="32" :height="32" />
                </div>
                <span class="text-primary text-xl font-semibold">Trello DSW</span>
            </RouterLink>
            <RouterLink to="/quadros" class="flex items-center bg-tertiary hover:bg-customWhite hover:text-primary transition ease-in text-white font-semibold p-3 rounded-xl">
                <p> Boards </p>
            </RouterLink>
        </div>
        <div class="flex items-center space-x-4">
            <button v-if="currentUser !== null" @click="changePassword" class="flex items-center bg-tertiary hover:bg-customWhite hover:text-primary transition ease-in text-white font-semibold p-3 rounded-xl">
                Change Password
            </button>
            <button v-if="currentUser !== null" @click="logout" class="bg-red-500 text-white font-semibold rounded-xl p-3 hover:bg-red-800 transition">
                Logout
            </button>
        </div>
    </nav>
</template>

<script setup>
import LogoComponent from '@/components/logoComponent.vue';
import { supabase } from '@/clients/supabase.js';
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { eventBus } from '@/eventBus.js';

const router = useRouter();

async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(error);
        return;
    } else {
        console.log('Logged out');
    }

    currentUser.value = null;
    router.push('/login');
}

async function changePassword() {
    router.push('/update-password');
}

const currentUser = ref(null);

const fetchCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();

    return data.user || null;
};

onMounted(async () => {
    currentUser.value = await fetchCurrentUser();

    eventBus.on('userLogged', async (user) => {
        currentUser.value = await fetchCurrentUser();
    });
});



</script>
