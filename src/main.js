import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'; // Pinia import 추가
import router from '@/router/index';

// Vue 애플리케이션 생성
const app = createApp(App);

// Pinia 인스턴스 생성 및 애플리케이션에 등록
const pinia = createPinia();
app.use(pinia);

// Vue Router 등록
app.use(router);

// 애플리케이션을 마운트
app.mount('#app');
