import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
    }
});
