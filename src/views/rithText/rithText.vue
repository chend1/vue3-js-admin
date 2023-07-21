<script setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import {
  onBeforeUnmount, ref, shallowRef,
} from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const editorRef = shallowRef();

setTimeout(() => {
  // 所有菜单配置
  const editor = editorRef.value;
  console.log(editor.getAllMenuKeys());
}, 1000);
// 内容 HTML
const valueHtml = ref('');
// const toolbarConfig = {};
const toolbarConfig = {
  toolbarKeys: ['headerSelect', 'bold', 'italic', '|', 'underline', 'codeBlock',
    'fontFamily', 'fontSize', 'lineHeight', 'emotion', {
      key: 'group-more-style', // 必填，要以 group 开头
      title: '更多样式', // 必填
      menuKeys: ['through', 'code', 'clearStyle'], // 下级菜单 key ，必填
    }],
};
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/api/upload',
      base64LimitSize: 500 * 1024, // 5kb
    },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleSave = () => {
  console.log(editorRef.value.getText());
  console.log(valueHtml.value);
};
</script>

<template>
  <div class="rith-text">
    <div class="title">
      <div class="label">
        富文本编辑 -->
      </div>
      <div class="value">
        <a
          href="https://www.wangeditor.com/v5/API.html#getallmenukeys"
          target="_blank"
        >官方文档</a>
      </div>
    </div>
    <Toolbar
      ref="editor"
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      mode="default"
    />
    <Editor
      v-model="valueHtml"
      style="height: 600px; overflow-y: hidden;"
      :default-config="editorConfig"
      mode="default"
      @on-created="handleCreated"
    />
    <div class="operation">
      <div
        class="btn"
        @click="handleSave"
      >
        保存
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.rith-text {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;

  .title {
    width: 100%;
    line-height: 50px;
    box-sizing: border-box;
    padding: 0 10px;
    border-bottom: 1px solid #aaa;
    display: flex;

    .value {
      margin-left: 20px;
      a {
        display: inline-block;
        color: #6c9bf1;
      }
    }
  }

  .operation {
    width: 100%;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;

    .btn {
      width: 100px;
      line-height: 35px;
      text-align: center;
      border: 1px solid #eee;
      border-radius: 5px;
      margin: 10px 10px 0 0;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
