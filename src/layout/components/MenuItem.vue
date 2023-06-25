<script setup>
defineProps({
  menuInfo: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<template>
  <el-menu-item
    v-if="!menuInfo.children || !menuInfo.children.length"
    class="menu"
    :index="menuInfo.path"
  >
    <el-icon>
      <component
        :is="menuInfo.icon"
        v-if="menuInfo.icon"
        class="myIcon"
      ></component>
    </el-icon>
    <template #title>
      <span>{{ menuInfo.title }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu
    v-else
    :index="menuInfo.path"
  >
    <template #title>
      <el-icon>
        <component
          :is="menuInfo.icon"
          v-if="menuInfo.icon"
          class="myIcon"
        ></component>
      </el-icon>
      <span>{{ menuInfo.title }}</span>
    </template>
    <el-menu-item-group>
      <template
        v-for="item in menuInfo.children.filter(item => item.status === 1)"
        :key="item.path"
      >
        <MenuItem :menu-info="item"></MenuItem>
      </template>
    </el-menu-item-group>
  </el-sub-menu>
</template>
<style scoped lang="less">
.myIcon {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
:deep(.el-menu-item-group__title) {
  display: none;
}
</style>
