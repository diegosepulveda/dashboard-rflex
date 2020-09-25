import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import moment from "moment"
import store from "./store"
import axios from "axios"


Vue.config.productionTip = false

Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

moment.locale("es");
window.moment = moment;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
