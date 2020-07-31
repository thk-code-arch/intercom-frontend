import axios from 'axios';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import * as VeeValidate from 'vee-validate'
import './assets/styles/index.css';
Vue.config.productionTip = false
//font awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)// set auth header
Vue.use(Vuex);
Vue.use(VeeValidate);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



axios.interceptors.response.use(function (response) {
return response
}, function (error) {
console.log(error.response.data)
if (error.response.status === 401) {
console.log("muhaaa")
    store.dispatch('auth/logout');
    router.push('/login');
}
return Promise.reject(error)
})
