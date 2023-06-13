import { createApp } from 'vue';
import { createPinia } from 'pinia';
// 样式初始化
import 'normalize.css/normalize.css'; // CSS重置
import './styles/reset.less';
// element导入
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 路由
import router from './router';
import App from './App.vue';
// mock拦截请求
import { mockXHR } from '../mock/index';

if (import.meta.env.MODE === 'development') {
  mockXHR();
}
// 状态管理
const pinia = createPinia();

createApp(App).use(pinia).use(ElementPlus).use(router)
  .mount('#app');
