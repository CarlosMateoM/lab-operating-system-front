<template>
    <Layaout v-slot:main>
        <div class="flex w-full h-full">
            <div class="flex-auto w-1/4 rounded-md bg-gray-100 mx-2">

                <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl  font-bold leading-none text-gray-900">Process catalogs</h5>
                    </div>
                    <div class="flow-root">
                        <a @click="loadCatalogs" class="text-sm font-medium text-gray-400 hover:underline cursor-pointer">
                            Update catalog
                        </a>
                        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                            <li v-if="catalogs != null" v-for="catalog in catalogs.data" class="py-3 sm:py-4">
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate ">
                                        {{ catalog.name }}
                                    </p>
                                    <p class="text-sm font-medium text-gray-900 truncate ">
                                        {{ catalog.date }}
                                    </p>
                                    <p class="text-sm text-gray-500 truncate">
                                        {{ catalog.time }}
                                    </p>
                                    <a @click="setSelectedCatalog(catalog)"
                                        class="text-sm font-medium text-gray-900 hover:underline cursor-pointer">
                                        Select catalog
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
            <div class="flex-auto w-3/4 mx-2">
                <div class="w-full mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                    <h2 class="mb-12 font-bold text-center text-gray-900  text-4xl" > Simulation details </h2>
                    <div class="flex justify-between mb-6">
                        <div class="flex justify-around w-2/4">
                            <div>
                                <label for="quantum" class="block mb-2 text-sm font-medium text-gray-900">
                                    Quantum
                                </label>
                                <input type="number" id="qtInput"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    placeholder="2" required>
                            </div>
                            <div>
                                <label for="th" class="block mb-2 text-sm font-medium text-gray-900">
                                    TH (milliseconds)
                                </label>
                                <input type="number" id="thInput"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="1000" required>
                            </div>
                        </div>
                        <div class="w-2/4 flex justify-around">
                            <button 
                                @click="startSimulation"
                                type="submit" 
                                class="mt-7 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Start</button>
                                <button 
                                    @click="stopSimulation"
                                    type="submit"
                                    class="mt-7 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Stop</button>
                                <button 
                                    @click="resetSimulation"
                                    type="submit"
                                    class="mt-7 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Reset</button>
                                
                        </div>
                    </div>
                </div>


                <Simulation ref="childSimulation" v-if="selectedCatalog != null" :catalog="selectedCatalog" ></Simulation>


                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    PID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    NAME
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    USER
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    DESCRIPTION
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    MEMORY
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    CPU
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    PRIORITY
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="selectedCatalog != null" v-for="process in selectedCatalog.processes"
                                class="bg-white border-b ">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {{ process.pid }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ process.name }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ process.user }}
                                </td>
                                <td class="px-6 py-4 overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {{ process.description.length }}
                                </td>
                                <td class="px-6 py-4 overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {{ process.memory }}
                                </td>
                                <td class="px-6 py-4 overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {{ process.cpu }}
                                </td>
                                <td class="px-6 py-4 overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {{ process.priority }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    </Layaout>
</template>
<script setup>

import Simulation from '../components/Simulation.vue'
import Layaout from '../layaout/Layaout.vue';
import { onMounted, ref } from 'vue';
import store from '../store';

const catalogs = ref(null);
const selectedCatalog = ref(null);
const childSimulation = ref(0);

const startSimulation = () => {
    const thInput = document.getElementById('thInput');
    const qtInput = document.getElementById('qtInput');

    childSimulation.value.th = parseInt(thInput.value);
    childSimulation.value.qt = parseInt(qtInput.value);
    childSimulation.value.simularRoundRobin();
}

const resetSimulation = () => {
    childSimulation.value.resetSimulation();
}

const stopSimulation = () => {
    childSimulation.value.simulationRuning = false;
}

const loadCatalogs = () => {
    store.dispatch('getCatalog')
        .then(() => {
            catalogs.value = store.state.catalog;
        })
}

const setSelectedCatalog = (catalog) => {
    selectedCatalog.value = catalog;
}

onMounted(() => loadCatalogs());

</script>