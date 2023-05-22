import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import Toaster from '@meforma/vue-toaster';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

require('@/store/subscriber');

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

store.dispatch('auth/attempt', localStorage.getItem('token'))
.then( ()=> {
    createApp(App).use(store).use(router).use(Toaster).mount('#app')
});

// import "bootstrap/dist/js/bootstrap.min.js"


