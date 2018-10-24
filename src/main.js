import Vue from 'vue'
import VueResource from 'vue-resource';
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Auth from './services/Auth'

import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(VueResource);
Vue.http.interceptors.push(Auth.authHeaderInterceptor);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

Auth.init();
