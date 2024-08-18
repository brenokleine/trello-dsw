<template>
    <div class="flex justify-center items-center bg-primary">
        <div class="border border-solid border-4 rounded-lg border-tertiary bg-quaternary font-sans text-xl p-3">
            <RouterLink to="/" class="font-bold text-md text-tertiary hover:bg-tertiary hover:text-customWhite rounded-full p-2 transition ease-out duration-100 hover:cursor-pointer">
                Back
            </RouterLink>

            <div class="p-16 pt-0">
                <div class="w-full flex justify-center items-center p-8 text-3xl font-bold">
                    <h1> Update Password </h1>
                </div>
                <div class="flex gap-3 flex-col">
                    <form @submit.prevent="updatePassword">
                        <div class="flex gap-8 justify-between items-center">
                            <label for="newPassword" class="font-semibold"> New Password: </label>
                            <input type="password" id="newPassword" class="border-2 font-mono border-tertiary rounded-full p-2 bg-customWhite" v-model="newPassword" required>
                        </div>
                        <div class="flex gap-8 justify-between items-center mt-4">
                            <button type="submit" class="bg-primary text-customWhite rounded-full p-2 hover:cursor-pointer hover:bg-tertiary transition ease-in duration-100 w-full">
                                Change my Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { supabase } from '@/clients/supabase.js';

export default {
    name: 'UpdatePasswordView',
    data() {
        return {
            newPassword: '',
        };
    },
    methods: {
        async updatePassword() {
            try {
                const { data, error } = await supabase.auth.updateUser({
                    password: this.newPassword
                })

                if (error) {
                    throw new Error(error.message);
                }

                alert('Password updated successfully!');
                // logout the user and redirect to login page
                await supabase.auth.signOut();
                this.$router.push('/login');
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>