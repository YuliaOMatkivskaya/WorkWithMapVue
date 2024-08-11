import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

app.use(VueApexCharts)
app.component('EasyDataTable', Vue3EasyDataTable);

app.component('name-page', {
    props: ['title'],
    template: `<h1>{{ title }}</h1>`
  });

app.use(router)
app.mount('#app')
