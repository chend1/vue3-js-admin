<script setup>
const dd = '';
function aa() {
  console.log(123, dd);
}
aa();
</script>

<template>
  <div class="test">
    <ul>
      <li
        v-for="item in 10"
        :key="item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less"></style>
