import { createApp } from 'vue';
import 'normalize.css/normalize.css'; // CSS重置
import './styles/reset.less';
import router from './router';
import App from './App.vue';

createApp(App).use(router).mount('#app');
