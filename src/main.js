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
import svgIcon from '@/assets/svg/index.vue';
import router from './router';
// 路由守卫
import './router/guard';
import App from './App.vue';
// mock拦截请求
import { mockXHR } from '../mock/index';
// svg引入
// 用于给脚手架插件在打包和开发时做相应的处理，如果没有这行代码，svg图标将无法正常展示
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
// 导入自定义指令
import { vContextmenu } from './directive/contextMenu';

console.log(vContextmenu);

if (import.meta.env.MODE === 'development') {
  mockXHR();
}

// 状态管理
const pinia = createPinia();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component('SvgIcon', svgIcon);
app.directive('contextmenu', vContextmenu);
const Icon = (props) => {
  const { icon } = props;
  return createVNode(ElementPlusIconsVue[icon]);
};
app.component('Icon', Icon);
app.use(pinia).use(ElementPlus).use(router)
  .mount('#app');
