<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3">
            <h2 class="text-xl font-bold mb-4">Add Contributor:</h2>
            <div>
                <div class="mb-4">
                    <label for="email" class="flex text-md font-medium text-secondary">E-Mail: </label>
                    <input type="text" id="email" v-model="email" class="mt-1 p-2 w-full border rounded-lg" required>

                    <div class="pt-3">
                        <label for="permissions" class="flex text-md font-medium text-secondary">Permissions: </label>
                        <div class="">
                            <label class="font-medium text-secondary flex items-center">
                                <input type="radio" v-model="permission" value="read" class="mr-2">
                                Read
                            </label>
                            <label class="font-medium text-secondary flex items-center">
                                <input type="radio" v-model="permission" value="edit" class="mr-2">
                                Edit
                            </label>
                        </div>
                    </div>

                </div>
                <div class="flex justify-end gap-2">
                    <button type="submit"
                        class="bg-green-500 hover:bg-green-600 transition ease-in duration-75 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                        :disabled="email.length === 0" @click.prevent="confirmContributorAdd">
                        Add
                    </button>
                    <button type="button" @click="cancelContributorAdd"
                        class="mr-4 bg-red-600 hover:bg-red-700 text-white transition ease-in duration-75 py-2 px-4 rounded-lg">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['cancelContributorAdd', 'confirmContributorAdd']);

const email = ref('');
const permission = ref('');

const cancelContributorAdd = () => {
    emit('cancelContributorAdd');
};

const confirmContributorAdd = () => {
    emit('confirmContributorAdd', { email: email.value, permission: permission.value });
};


</script>