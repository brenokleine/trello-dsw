<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3 relative">
            <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"> X </button>
            <h2 class="text-2xl font-bold mb-4">Forgot Password</h2>
            <form @submit.prevent="submitForm">
                <div class="flex gap-8 justify-between items-center">
                    <label for="email" class="font-semibold text-lg">Email</label>
                    <input type="email" id="email" class="border-2 font-mono border-tertiary rounded-full p-2 bg-customWhite" v-model="email" required />
                </div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import { supabase } from '@/clients/supabase.js';

export default {
    data() {
        return {
            email: '',
            option: 'email',
            isSubmitting: false,
        };
    },
    methods: {
        async submitForm() {
            if (this.isSubmitting) return;
            
            this.isSubmitting = true;
            try {
                const { error } = await supabase.auth.resetPasswordForEmail(this.email, {
                  redirectTo: 'http://localhost:5173/update-password',
                });
            
                if (error) {
                    console.error("Erro ao enviar o e-mail de recuperação de senha:", error.message);
                    alert("Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente.");
                } else {
                    alert("Se o e-mail estiver registrado, um e-mail de recuperação de senha será enviado.");
                }
            } catch (error) {
                console.error("Erro ao enviar o formulário:", error);
                alert("Ocorreu um erro inesperado. Por favor, tente novamente.");
            } finally {
                this.isSubmitting = false;
            }
        },
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>
