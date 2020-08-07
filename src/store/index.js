import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { curproject } from './project.module';
import { viewport } from './viewport.module';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    auth,
    curproject,
    viewport
  }
});
