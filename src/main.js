import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import store from "./store";
import "./assets/styles/index.css";
import VueFormulate from "@braid/vue-formulate";

import axios from "axios";
Vue.prototype.$profile_image =
  process.env.VUE_APP_API_URL + "static/profile_image/";
Vue.prototype.$app_url = process.env.VUE_APP_API_URL;
const API_URL = process.env.VUE_APP_API_URL+'api/';

Vue.prototype.$http = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Vue.prototype.$http.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log(error.response.data);
    if (error.response.status === 401) {
      store.dispatch("auth/logout");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);


Vue.prototype.$http.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      config.headers["Authorization"] = "Bearer " + user.accessToken;
    }
    config.headers["Content-Type"] = "application/json";
    console.log("$http axios request",config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

Vue.config.productionTip = false;
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);
import Embed from "v-video-embed";
Vue.use(Embed);

Vue.use(VueFormulate, {
  classes: {
    outer: "mb-4",
    input:
      "border border-gray-400 rounded px-3 py-2 leading-none focus:border-codearch-500 outline-none border-box w-full mb-1",
    label: "font-medium text-sm",
    help: "text-xs mb-1 text-gray-600",
    error: "text-red-700 text-xs mb-1",
  },
});
Vue.use(Vuex);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
