<template>
    <Layaout v-slot:main>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit="login">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input id="email" name="email" type="email" autocomplete="email" required v-model="form.email"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input id="password" name="password" type="password" autocomplete="current-password" required v-model="form.password"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>  

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign In
                    </button>

                    <p class="mt-10 text-center text-sm text-gray-500">
                        Create account 
                        <router-link :to="{name: 'Register'}" class="font-semibold leading-6 text-grat-600 hover:text-indigo-500">
                            
                            here!</router-link>
                    </p>
                </div>
            </form>
        </div>
    </Layaout>
</template>
  
<script setup>
import store from '../store';
import Layaout from '../layaout/Layaout.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = {
    email: '',
    password: '',
}

function login(ev){
    ev.preventDefault();
    store.dispatch('login', form)
    .then(() => {
        router.push({name:'ControlPanel'})
    })
    .catch(error => {
        console.log(error.response.data)
    })

}

</script>

