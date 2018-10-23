import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue'
import router from './router'
import store from './store'
import Auth from './services/Auth'

Vue.use(VueResource);
Vue.http.interceptors.push(Auth.authHeaderInterceptor);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
