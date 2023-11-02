<template>
    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ props.pid }}</h5>
    <p class="font-normal text-gray-700">{{ props.name }}</p>
    <p class="font-normal text-gray-700">tr: {{ props.tr }}</p>
    <p class="font-normal text-gray-700">execution: {{ props.execution }}</p>
</a>
</template>
<script setup>

const props = defineProps({
    pid: Number,
    name: String,
    tr: Number,
    execution:  Number
});

</script>