import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import moment from "moment";

Vue.config.productionTip = false

moment.locale("es");
window.moment = moment;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
