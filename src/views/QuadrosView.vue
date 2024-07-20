<template>
    <!-- Sidebar -->
    <div class="flex h-screen">
        <div class=" w-56 bg-primary text-white flex flex-col">
            <div class="p-4 border-b border-tertiary">
                <h1 class="text-xl font-bold">Actions</h1>
            </div>
            <div class="flex-grow p-4">
                <ul>
                    <li class="mb-4">
                        <button class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                            Add New
                            <i class="pi pi-check"></i>
                        </button>
                    </li>
                    <li>
                        <button class="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
                            Delete All
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div>

    </div>
</template>

<script setup>
import { supabase } from '@/clients/supabase.js';



</script>
