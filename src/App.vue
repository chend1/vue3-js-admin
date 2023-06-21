<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import layout from './layout/layout.vue';
</script>

<template>
  <el-config-provider :locale="zhCn">
    <layout v-if="$route.meta.isLayout" /> <router-view v-else />
  </el-config-provider>
</template>

<style scoped></style>
