import { createApp } from 'vue';
import App from './App.vue';

window.app = createApp(App);

window.vm = window.app.mount('#app');
