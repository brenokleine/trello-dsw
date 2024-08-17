<template>
    <div class="flex justify-center items-center bg-primary">
        <div class="border border-solid border-4 rounded-lg border-tertiary bg-quaternary font-sans text-xl p-3">
            <RouterLink to="/" class="font-bold text-md text-tertiary hover:bg-tertiary hover:text-customWhite rounded-full p-2
                transition ease-out duration-100 hover:cursor-pointer">
                Back
            </RouterLink>

            <div class="p-16 pt-0">
                <div class="w-full flex justify-center items-center p-8 text-3xl font-bold">
                    <h1>
                        Login
                    </h1>
                </div>
                <div class="flex gap-3 flex-col">
                    <div class="flex gap-8 justify-between items-center">
                        <label for="email" class="font-semibold">Email</label>
                        <input type="email" id="email"
                            class="border-2 font-mono border-tertiary rounded-full p-2 bg-customWhite" v-model="email"
                            required />
                    </div>
                    <div class="flex gap-8 justify-between items-center">
                        <label for="password" class="font-semibold">Password</label>
                        <input type="password" id="password"
                            class="border-2 font-mono border-tertiary rounded-full p-2 bg-customWhite"
                            v-model="password" required />
                    </div>
                    <div class="w-full flex font-semibold justify-center">
                        <button @click.prevent="login" class="bg-primary text-customWhite rounded-full p-2 
                            hover:cursor-pointer hover:bg-tertiary transition ease-in duration-100 w-full">
                            Login
                        </button>
                    </div>
                    <div class="w-full flex font-semibold justify-center">
                        <button @click.prevent="createAccount" class="bg-primary text-customWhite rounded-full p-2 
                            hover:cursor-pointer hover:bg-tertiary transition ease-in duration-100 w-full">
                            Create Account
                        </button>
                    </div>

                    <div class="w-full flex font-semibold justify-center">
                        <button @click.prevent="seeCurrentUser" class="bg-primary text-customWhite rounded-full p-2 
                            hover:cursor-pointer hover:bg-tertiary transition ease-in duration-100 w-full">
                            See current user
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { eventBus } from '@/eventBus.js';
import { supabase } from '@/clients/supabase.js';

const email = ref('');
const password = ref('');

const router = useRouter();

async function createAccount(){
    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
    });

    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
}

async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });

    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }

    eventBus.emit('userLogged', data.user);
    router.push('/quadros');
}

async function seeCurrentUser() {
    const localUser = await supabase.auth.getSession();
    console.log(localUser); 
}



</script>

