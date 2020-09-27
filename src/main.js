import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import moment from "moment"
import store from "./store"
import axios from "axios"


Vue.config.productionTip = false

var direccion = window.location.href;
var ruta = "http://api.dashboard.test/";
if (direccion.includes('kindall')) {
	ruta = "http://api.dashboard.kindall.io/";
}

axios.defaults.baseURL = ruta;

Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

moment.locale("es");
window.moment = moment;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
