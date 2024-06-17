import { createApp } from 'vue'
import './index.scss'
import App from './App.vue'
import router from "./router";
import { createPinia } from 'pinia'
import { Skeletor } from "vue-skeletor";
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

import 'vue-skeletor/dist/vue-skeletor.css';

const pinia = createPinia()
const app = createApp(App)

app.component(Skeletor.name, Skeletor);
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

app.use(router);
app.use(pinia)
app.use(setupCalendar, {})
app.mount('#app')
