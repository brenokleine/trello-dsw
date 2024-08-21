<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-customWhite p-8 rounded-lg shadow-lg w-1/3">
            <div class="mb-4">
                <button v-for="(pdf, index) in pdfArray" :key="index" class="mr-4 bg-gray-600 hover:bg-gray-700 text-white transition ease-in duration-75 py-2 px-4 rounded-lg"
                    @click.prevent="retrievePdf(index)">
                    {{ pdf.name }}
                </button>
            </div>
            <h2 class="text-xl font-bold mb-4">Add PDF file</h2>
            <div class="mb-4">
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400
                    focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" ref="fileInput" @change="handleFileSelection">
            </div>
            <div class="flex justify-around">
                <button type="button" @click="closePdfModal"
                    class="mr-4 bg-red-600 hover:bg-red-700 text-white transition ease-in duration-75 py-2 px-4 rounded-lg">
                    Close
                </button>
                <button type="button"
                    class="bg-green-500 hover:bg-green-600 transition ease-in duration-75 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                    @click.prevent="uploadPdf">
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from 'vue';
import { supabase } from '@/clients/supabase';

const emit = defineEmits(['closePdfModal']);

const selectedFile = ref(null);

const pdfArray = ref([]);

const props = defineProps({
    nomeQuadro: {
        type: String,
        required: true
    }
});

const closePdfModal = () => {
    emit('closePdfModal');
};

const listPdfsFromBoardName = async () => {
    const boardName = props.nomeQuadro;
    const {data} = await supabase.storage.from(boardName).list();

    if(data.length === 0) {
        await createNewBucket(boardName);
    }

    pdfArray.value = data;
    console.log(pdfArray.value);
    // pegar a lista de PDFs e exibir para o usuario poder baixar
}

const uploadPdf = async () => {
    if (!selectedFile.value) {
        console.log('Nenhum arquivo selecionado');
        return;
    }

    const boardName = props.nomeQuadro;
    await supabase.storage.from(boardName).upload(selectedFile.value.name, selectedFile.value, {upsert: true});

    closePdfModal();
}

const retrievePdf = async (index) => {
    const boardName = props.nomeQuadro;

    // baixar o PDF
    const { data } = await supabase
        .storage
        .from(boardName)
        .download(pdfArray.value[index].name);

    // Criar um URL para o Blob e baixar o arquivo
    const blobUrl = URL.createObjectURL(data);

    // Criar um link para o download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = pdfArray.value[index].name; // Nome do arquivo para salvar
    document.body.appendChild(link);
    link.click();

    // Remover o link após o download
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl); // Liberar memória
}

const createNewBucket = async (boardName) => {
    await supabase
        .storage
        .createBucket(boardName, {
            public: true
        })
}

const handleFileSelection = (event) => {
    selectedFile.value = event.target.files[0];
}

onMounted(() => {
    listPdfsFromBoardName();
});

</script>