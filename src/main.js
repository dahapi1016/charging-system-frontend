import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import axios from "axios";
import 'element-plus/dist/index.css';

axios.defaults.baseURL = 'http://localhost:8080'  // 这里修改后端服务器地址
const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus);
app.use(router)
app.mount('#app')
