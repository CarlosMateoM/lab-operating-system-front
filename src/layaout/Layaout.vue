<template>
    <div class="flex flex-col w-full h-full bg-slate-50 absolute">
        <nav class="w-full p-3 text-center">
            <h1 class="text-4xl font-bold text-gray-900 tracking-tight  sm:text-6xl">Lab Operating System</h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">Round-robin algorithm simulator for process planning</p>
            
            <div v-if="user != null" class="absolute top-4 right-4">
                <button @click="logout" class="bg-gray-900 hover:bg-gray-600 text-white  py-2 px-4 rounded-full shadow-md">
                    Logout
                </button>
            </div>

        </nav>
        <slot name="main"></slot>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import store from '../store';
import { useRouter } from 'vue-router';


const router = useRouter();

const user =  computed(() => {
    return store.state.user.token;
});

function logout(){
    store.dispatch('logout')
    .then(() => {
        router.push({name:'Login'})
    })
}


</script>