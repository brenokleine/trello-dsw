<template>
    <div class="h-full w-52 bg-quaternary rounded-lg">
        <div class="w-full h-fit">
            <p class="text-2xl font-semibold p-2 border-b border-secondary">
                {{ title }}
            </p>
            <div class="flex justify-between p-2">
                <p class="text-lg font-semibold ">
                    Cards: {{ cards.length }}
                </p>

                <button class="bg-green-500 hover:bg-green-700 text-sm font-semibold text-white rounded-full p-2"
                    @click="openModal">
                    Add
                </button>
            </div>
        </div>

        <!-- render cards here -->
        <div class="w-full h-fit p-2 flex flex-col gap-3">
            <Card v-for="card in cards" :text="card.text" :id="card.id" />
        </div>

        <!-- Add Card Modal -->
        <div v-if="isModalOpen" @click.prevent="backgroundClick"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3">
                <h2 class="text-xl font-bold mb-4">Add Card</h2>
                <div>
                    <div class="mb-4">
                        <label for="text" class="block text-sm font-medium text-secondary">Text</label>
                        <input type="text" id="text" v-model="form.text" class="mt-1 p-2 w-full border rounded-lg" required>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" @click="closeModal"
                            class="mr-4 bg-red-700 hover:bg-red-600 text-white transition ease-linear duration-100 py-2 px-4 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit"
                            class="bg-green-500 hover:bg-green-700 transition ease-linear duration-100 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                            :disabled="form.text.length === 0" @click.prevent="addCard">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal -->
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { supabase } from '@/clients/supabase.js';
import Card from '@/components/Card.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

const cards = ref([]);

const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const backgroundClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

const form = ref({
    text: '',
});

const fetchCards = async () => {
    const { data, error } = await supabase
        .from('cartoes')
        .select('*')
        .eq('lista_id', props.id);
    if (error) {
        console.error('Error fetching cards:', error.message);
    } else {
        console.log('Cards:', data);
    }

    cards.value = data;
};

const addCard = async () => {
    try {
        const { data, error } = await supabase
            .from('cartoes')
            .insert({
                text: form.value.text,
                lista_id: props.id
            });
        if (error) throw error;
        console.log('Card added successfully');
        fetchCards();
    } catch (error) {
        console.error('Error adding card:', error.message);
    }

    form.value.text = '';
    closeModal();
};

onMounted(async () => {
   await fetchCards();
});

</script>