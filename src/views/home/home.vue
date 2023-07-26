<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const text = ref('');
const handlePaste = (event) => {
  const clipdata = event.clipboardData || window.clipboardData;
  const content = clipdata.getData('text/plain');
  if (content) {
    try {
      navigator.clipboard.writeText(content);
    } catch {
      event.preventDefault();
      ElMessage({
        type: 'error',
        message: '粘贴失败,仅支持localhost或https',
      });
    }
  }
  // const list = clipboard.readImage();
  // if (list.toDataURL() === 'data:image/png;base64,') {
  //   const text = clipboard.readText();
  //   clipboard.writeText(text);
  // }
  // this.$refs.textareaRef.scrollTop = this.$refs.textareaRef.scrollHeight;
};
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
        @paste="handlePaste"
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
