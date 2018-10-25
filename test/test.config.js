import Vue from 'vue';
import VueResource from 'vue-resource';
import BootstrapVue from 'bootstrap-vue';
import httMock from './httpMock';

import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(VueResource);
httMock();

Vue.use(BootstrapVue);
