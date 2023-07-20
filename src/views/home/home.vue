<script setup>
import { ref } from 'vue';
// window.oncontextmenu = (e) => {
//   e.preventDefault();
// };
const text = ref('');
</script>

<template>
  <div class="home">
    <div class="box">
      <h3>svg使用</h3>
      <svg-icon
        name="message"
        color="#eee"
      />
    </div>
    <div class="box">
      <h3>https/localhost 文本复制粘贴和剪切功能</h3>
      <input
        v-model="text"
        v-contextmenu
        class="input"
        type="text"
      />
    </div>
    <div class="box">
      <h3>https/localhost 文本图片复制粘贴和剪切功能</h3>
      <div
        v-contextmenu
        class="img"
        contenteditable="true"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px 20px;
  .test{
    width: 100%;
    height: 50px;
    user-select: text;
  }
  .input{
    border: 1px solid #eee;
    outline: none;
    line-height: 30px;
    padding: 0 10px;
  }
  .img{
    width: 500px;
    height: 300px;
    border: 1px solid #eee;
    outline: none;
    color: #333;
    padding: 10px;
  }
}
</style>
