// Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import store from "./store";
import "./assets/styles/index.css";
import VueFormulate from "@braid/vue-formulate";

import axios from "axios";
import {API, FILES} from "./services/api";

import Notifications from 'vue-notification'
Vue.use(Notifications)
//general API URL
//Vue moment
import VueMoment from 'vue-moment'
import moment from "moment";
Vue.use(VueMoment, {
    moment,
})
Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("DD.MM.YYYY HH:mm");
  }
});

Vue.prototype.$app_url = API;
//Location for static files, remove trailing slash, because API answers with root /files
Vue.prototype.$files_url = FILES;

Vue.prototype.$http = axios.create({
  baseURL: API+/api/,
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
