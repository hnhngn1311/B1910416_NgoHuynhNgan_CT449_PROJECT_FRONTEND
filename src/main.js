import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import './assets/main.css'
import router from './router'

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker)
app.use(router)

app.mount('#app')
