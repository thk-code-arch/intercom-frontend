import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { curproject } from './project.module';

Vue.use(Vuex);
//TODO add current Project module
export default new Vuex.Store({
  modules: {
    auth,
    curproject
  }
});
