// Copyright (c) 2021 Steffen Stein <mail@steffenstein.com> For LICENSE see docs/LICENSE

export const viewport = {
  namespaced: true,
  state: {
    currentViewport: 0,
    players: [],
    camPosi: {},
    othercamPos: {},
    materials: {},
    takeScreenshot: false,
    imgDataurl: '',
    selectedSubprojects: [],
    subprojectsPositions: [],
    selectedViewport: 'ifc',
  },
  actions: {
    // Read materials List from GLTF (not as usefull...)
    setmaterialList({ commit }, materials) {
      commit('materialList', materials);
    },
    // set own camera postion -> send to Server
    setowncamPos({ commit }, position) {
      commit('owncamPos', position);
    },
    // Takeover camera position -> receive from Server
    getcamPos({ commit }, position) {
      commit('othercamPos', position);
    },
    // Take screenshots
    takeScreenshot({ commit }) {
      commit('takeScreenshotNow');
    },
    imgStore({ commit }, dataUrl) {
      commit('storeImage', dataUrl);
    },
    join_viewport({ commit, state, dispatch, rootState }, projectId) {
      if (state.currentViewport !== projectId) {
        commit('clear');
      }
      if (projectId !== 0) {
        if (!rootState.iosockets.viewport) {
          dispatch('iosockets/init_viewport', null, { root: true });
        }
        this._vm.$socket.viewport.emit('join_viewport', {
          oldRoom: state.currentViewport,
          newRoom: projectId,
        });
        commit('get_players', []);
        commit('Select_Viewport', projectId);
      }
    },
    push_position({ state, dispatch, rootState }) {
      if (state.currentViewport === 0) {
        dispatch('viewport/join_viewport', rootState.curproject.theproject.id, {
          root: true,
        });
      }
      if (state.currentViewport !== 0) {
        this._vm.$socket.viewport.emit('moveTo', {
          position: state.camPosi,
          chatroomId: state.currentViewport,
        });
      }
      // push ownCam Position
    },
    set_subproject({ state, commit }, subprojects) {
      const sPP = state.subprojectsPositions;

      const arrWithPositions = subprojects.map((x) => {
        const xyzZero = { x: 0, y: 0, z: 0 };
        const posi = sPP.find((p) => p.id === x)?.position;
        const roti = sPP.find((p) => p.id === x)?.rotation;
        return {
          id: x,
          position: posi || xyzZero,
          rotation: roti || xyzZero,
        };
      });
      commit('selectedSubprojects', subprojects);
      commit('setSubprojectsPositions', arrWithPositions);
    },

    PLAYER_updateSelectedSubprojects({ dispatch }, data) {
      console.log('socketpullProjects');
      dispatch('pullSubprojectPositions', JSON.parse(data));
    },
    PLAYER_getplayers({ commit, state, rootState }, data) {
      // get all connected players in array
      if (data.projectId === state.currentViewport) {
        let players = Object.keys(data.pos)
          .map((key) => data.pos[key])
          .filter((key) => key.userId !== rootState.auth.user.id);
        commit('get_players', players);
      }
    },
    clear({ commit, state }) {
      if (state.currentViewport !== 0) {
        this._vm.$socket.viewport.emit('disconnect', {
          chatroomId: state.currentViewport,
        });
      }
      commit('clear');
    },
    setViewport({ commit }, view) {
      commit('selectedViewport', view);
    },
    setSuprojectPosition({ commit, state }, data) {
      const newPosition = state.subprojectsPositions.map((x) => {
        if (x.id === data.id) {
          x.position = data.position;
        }
        return x;
      });
      commit('setSubprojectsPositions', newPosition);
    },
    pullSubprojectPositions({ commit, rootState }, pulledSpPositions) {
      const validSubprojects = rootState.curproject.theproject.subprojects.map(
        (x) => x.id
      );

      const validPulledSpPostitions = pulledSpPositions.filter((x) =>
        validSubprojects.includes(x.id)
      );

      const arrWithPositions = validPulledSpPostitions.map((x) => {
        const xyzZero = { x: 0, y: 0, z: 0 };
        return {
          id: x.id,
          position: x.position || xyzZero,
          rotation: x.rotation || xyzZero,
        };
      });

      const select = pulledSpPositions
        .map((x) => x.id)
        .filter((x) => validSubprojects.includes(x));

      commit('setSubprojectsPositions', arrWithPositions);
      commit('selectedSubprojects', select);
    },
  },
  mutations: {
    materialList(state, materials) {
      state.materials = materials;
    },
    owncamPos(state, position) {
      state.camPosi = position;
    },
    othercamPos(state, position) {
      state.othercamPos = position;
    },
    takeScreenshotNow(state) {
      state.takeScreenshot = !state.takeScreenshot;
    },
    storeImage(state, dataUrl) {
      state.imgDataurl = dataUrl;
    },
    Select_Viewport(state, projectId) {
      state.currentViewport = projectId;
    },
    get_players(state, data) {
      state.players = data;
    },
    clear(state) {
      state.players = [];
      state.camPosi = {};
      state.othercamPos = {};
      state.currentViewport = 0;
      state.selectedSubprojects = [];
      state.subprojectsPositions = [];
    },
    unloadSubprojects(state) {
      state.selectedSubprojects = [];
      state.subprojectsPositions = [];
    },
    //load subprojects in parentProject
    selectedSubprojects(state, selSubprojects) {
      state.selectedSubprojects = selSubprojects;
    },
    setSubprojectsPositions(state, selectedSubprojects) {
      state.subprojectsPositions = selectedSubprojects;
    },
    selectedViewport(state, view) {
      state.selectedViewport = view;
    },
  },
  getters: {
    subprojectPosition(state) {
      return (projectId) => {
        return state.subprojectsPositions.find((x) => x.id === projectId);
      };
    },
  },
};
