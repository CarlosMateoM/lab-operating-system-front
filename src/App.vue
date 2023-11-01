<script setup>

import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = computed(() => store.state.user);

</script>
<template>
  <router-view></router-view>
</template>
