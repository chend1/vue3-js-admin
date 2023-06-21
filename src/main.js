import { createApp, createVNode } from 'vue';
import { createPinia } from 'pinia';
// 样式初始化
import 'normalize.css/normalize.css'; // CSS重置
import './styles/reset.less';
// element导入
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 路由
import router from './router';
// 路由守卫
import './router/guard';
import App from './App.vue';
// mock拦截请求
import { mockXHR } from '../mock/index';

if (import.meta.env.MODE === 'development') {
  mockXHR();
}
// 状态管理
const pinia = createPinia();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const Icon = (props) => {
  const { icon } = props;
  return createVNode(ElementPlusIconsVue[icon]);
};
app.component('Icon', Icon);
app.use(pinia).use(ElementPlus).use(router)
  .mount('#app');
