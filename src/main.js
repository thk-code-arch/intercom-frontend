import axios from 'axios';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import './assets/styles/index.css';
import VueFormulate from '@braid/vue-formulate'

Vue.config.productionTip = false
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

Vue.use(VueFormulate, {
  classes: {
    outer: 'mb-4',
    input: 'border border-gray-400 rounded px-3 py-2 leading-none focus:border-indigo-400 outline-none border-box w-full mb-1',
    label: 'font-medium text-sm',
    help: 'text-xs mb-1 text-gray-600',
    error: 'text-red-700 text-xs mb-1'
  }
});
Vue.use(Vuex);
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


//Global Instance Properties
//
Vue.prototype.$api_url = "https://icapi.bim-cloud.org/"
Vue.prototype.$profile_image = "https://icapi.bim-cloud.org/static/profile_image/"
