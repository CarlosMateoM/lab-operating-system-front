<template>
    <div class="w-full mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
        <div class="flex w-full justify-around mb-6">

            <div>
                <label for="quantum" class="block mb-2 text-sm font-medium text-gray-900">
                    QUEUED
                </label>
                <div class="border-x-2 p-4">
                    <Process v-if="queued != null" v-for="process in queued" :name="process.name" :pid="process.pid"
                        :tr="process.TR" :execution="process.execution" ></Process>

                </div>
            </div>
            <div>
                <label for="th" class="block mb-2 text-sm font-medium text-gray-900">
                    EXECUTION
                </label>

                <div class="border-x-2 p-4">
                    <Process v-if="execution != null" v-for="process in execution" :name="process.name" :pid="process.pid"
                        :tr="process.TR" :execution="process.execution" />
                </div>
            </div>
            <div>
                <label for="th" class="block mb-2 text-sm font-medium text-gray-900">
                    FINISHED
                </label>
                <div class="border-x-2 p-4">
                    <Process v-if="finished != null" v-for="process in finished" :name="process.name" :pid="process.pid"
                        :tr="process.TR" :execution="process.execution" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { ref } from 'vue';
import Process from './Process.vue';

const props = defineProps({
    catalog: Object
});

const queued = ref([]);
const execution = ref([]);
const finished = ref([]);
const th = ref(1000);
const qt = ref(50);
const procesos = convertCatalogToProcesos(props.catalog);
const simulationRuning = ref(true);
let procesoEjecucion = null;


const resetSimulation = () => {
    queued.value = [];
    execution.value = [];
    finished.value = [];
}

function convertCatalogToProcesos(catalog) {

    const procesos = catalog.processes.map((item) => {
        return {
            ...item,
            descripcion: item.description,
            TR: item.description.length,
            execution: 0
        };
    });

    return procesos;
}

function calcularTR() {
    procesos.forEach((proceso) => {
        proceso.TR = proceso.name.length;
    });
    queued.value = [...procesos];
}

function simularRoundRobin() {

    simulationRuning.value = true;

    calcularTR();

    let tiempoTranscurrido = 0;

    const interval = setInterval(() => {

        setInterval(() => {

            if (!procesoEjecucion) {
                if (queued.value.length > 0) {
                    procesoEjecucion = queued.value.shift();
                    execution.value.push(procesoEjecucion);
                    procesoEjecucion.execution++;
                    console.log(`Proceso pid ${procesoEjecucion.pid} ha comenzado su ejecución.`);
                } else {
                    return;
                }
            }

        }, th.value);

        const procesoActual = procesoEjecucion;
        

        if (procesoActual.TR > 0) {
            console.log(`Ejecutando pid ${procesoActual.pid} ${procesoActual.TR}`);
            const quantum = Math.min(procesoActual.TR, qt.value);
            procesoActual.TR -= quantum;
            tiempoTranscurrido++;
            if (procesos.every((p) => p.TR <= 0)) {
                clearInterval(interval);
            }
        }

        if (procesoActual.TR > 0) {
            queued.value.push(procesoActual);
            const index = execution.value.findIndex((p) => p.pid === procesoActual.pid);
            if (index !== -1) {
                execution.value.splice(index, 1);
            }
            procesoEjecucion = null;
        }

        if (procesoActual.TR <= 0) {
            finished.value.push(procesoActual);
            const index = execution.value.findIndex((p) => p.pid === procesoActual.pid);

            if (index !== -1) {
                execution.value.splice(index, 1);
            }
            procesoEjecucion = null;
        }

        if (procesos.every((p) => p.TR <= 0) || !simulationRuning.value) {
            clearInterval(interval);
            console.log('Simulación terminada');
        }
    }, th.value);
}

defineExpose({
    simularRoundRobin,
    simulationRuning,
    resetSimulation,
    th,
    qt
});

</script>