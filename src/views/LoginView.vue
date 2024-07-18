<template>
    <div class="w-full h-full flex justify-center items-center bg-primary">
        <div class="border border-solid border-4 rounded-lg border-tertiary bg-quaternary font-sans text-xl p-12 pt-0">
            <div class="w-full flex justify-center items-center p-8 text-3xl font-bold">
                <h1>
                    Login
                </h1>
            </div>

            <form @submit.prevent="handleLogin" class="flex gap-3 flex-col">
                <div class="flex gap-8 justify-between items-center">
                    <label for="email" class="font-semibold">Email</label>
                    <input type="email" id="email" class="border-2 font-mono border-tertiary rounded-full p-2 bg-customWhite" v-model="email" required />
                </div>
                <div class="flex gap-8 justify-between items-center">
                    <label for="password" class="font-semibold">Password</label>
                    <input type="password" id="password" class="border-2 font-mono border-tertiary rounded-full p-2 bg-customWhite" v-model="password" required />
                </div>
                <div class="w-full flex font-semibold justify-center bg-primary text-customWhite rounded-full p-2 mt-8 hover:cursor-pointer hover:bg-tertiary">
                    <button type="submit">Login</button>
                </div>
            </form>
            
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = async () => {
    try {
        // // Replace with your Supabase login logic
        // const { user, error } = await supabase.auth.signIn({ email: email.value, password: password.value });
        // if (error) {
        //     throw error;
        // }
        // console.log('Login successful:', user);
    } catch (error) {
        // console.error('Error logging in:', error.message);
    }
};
</script>

