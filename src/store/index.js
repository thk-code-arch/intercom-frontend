// Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE

import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { curproject } from './project.module';
import { iosockets } from './sockets.module';
import { viewport } from './viewport.module';
import { chatroom } from './chatroom.module';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    auth,
    curproject,
    iosockets,
    viewport,
    chatroom
  }
});
