<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3 relative">
            <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"> X </button>
            <h2 class="text-2xl font-bold mb-4">Forgot Password</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label for="email" class="block mb-2">Email:</label>
                    <input type="email" id="email" v-model="email" required class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                </div>
                <div class="mb-4">
                    <label for="option" class="block mb-2">Choose an option:</label>
                    <select id="option" v-model="option" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                        <option value="email">Receive password via email</option>
                        <option value="change">Receive password change email</option>
                    </select>
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
                // Enviar o e-mail de redefinição de senha
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
