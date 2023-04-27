import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import vue3GoogleLogin from 'vue3-google-login'

// import './assets/main.css'

const app = createApp(App)

app.use(vue3GoogleLogin,{
    clientId : '794142405359-n7ub7rrvk7nolpej3rf6f52g1k81njsl.apps.googleusercontent.com'
})

app.use(VueSweetalert2).mount('#app')
