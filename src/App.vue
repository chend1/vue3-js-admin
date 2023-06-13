<script setup>
import layout from './layout/layout.vue';
</script>

<template>
  <layout v-if="!$route.meta.isHiddenLayout" />
  <router-view v-else />
</template>

<style scoped>

</style>
