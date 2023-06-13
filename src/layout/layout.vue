<script setup>

</script>

<template>
  <div class="layout">
    <div class="aside"></div>
    <div class="article">
      <div class="head"></div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.layout{
  width: 100%;
  height: 100vh;
  display: flex;
  .aside{
    width: 250px;
    height: 100%;
    overflow-y: auto;
    background-color: pink;
  }
  .article{
    flex: 1;
    overflow: hidden;
    background-color: yellowgreen;
  }
}
</style>
