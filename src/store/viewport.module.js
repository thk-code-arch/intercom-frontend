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
    imgDataurl: "",
    selectedSubprojects: [],
    selectedViewport: "ifc",
  },
  actions: {
    // Read materials List from GLTF (not as usefull...)
    setmaterialList({ commit }, materials) {
      commit("materialList", materials);
    },
    // set own camera postion -> send to Server
    setowncamPos({ commit }, position) {
      commit("owncamPos", position);
    },
    // Takeover camera position -> receive from Server
    getcamPos({ commit }, position) {
      commit("othercamPos", position);
    },
    // Take screenshots
    takeScreenshot({ commit }) {
      commit("takeScreenshotNow");
    },
    imgStore({ commit }, dataUrl) {
      commit("storeImage", dataUrl);
    },
    join_viewport({ commit, state, dispatch, rootState }, projectId) {
      if (state.currentViewport !== projectId) {
        commit("clear");
      }
      if (projectId !== 0) {
        if (!rootState.iosockets.viewport) {
          dispatch("iosockets/init_viewport", null, { root: true });
        }
        this._vm.$socket.viewport.emit("join_viewport", {
          oldRoom: state.currentViewport,
          newRoom: projectId,
        });
        commit("get_players", []);
        commit("Select_Viewport", projectId);
      }
    },
    push_position({ state, dispatch, rootState }) {
      if (state.currentViewport === 0) {
        dispatch("viewport/join_viewport", rootState.curproject.theproject.id, {
          root: true,
        });
      }
      if (state.currentViewport !== 0) {
        this._vm.$socket.viewport.emit("moveTo", {
          position: state.camPosi,
          chatroomId: state.currentViewport,
        });
      }
      // push ownCam Position
    },
    leave_viewport({ commit, state }) {
      if (state.currentViewport !== 0) {
        this._vm.$socket.viewport.emit("disconnect", {
          chatroomId: state.currentViewport,
        });
        commit("Select_Viewport", 0);
      }
      // TODO add disconnect: emit disconnect on disconnect
      // Remove disconnect players from array
      // disconnect when destroy View
    },
    PLAYER_getplayers({ commit, state, rootState }, data) {
      // get all connected players in array
      if (data.projectId === state.currentViewport) {
        let players = Object.keys(data.pos)
          .map((key) => data.pos[key])
          .filter((key) => key.userId !== rootState.auth.user.id);
        commit("get_players", players);
      }
    },
    clear({ commit, state }) {
      if (state.currentViewport !== 0) {
        this._vm.$socket.viewport.emit("disconnect", {
          chatroomId: state.currentViewport,
        });
      }
      commit("clear");
    },
    setViewport({ commit }, view) {
      commit("selectedViewport", view);
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
      console.log("clear");
    },
    //load subprojects in parentProject
    selectedSubprojects(state, selSubprojects) {
      state.selectedSubprojects = selSubprojects;
    },
    selectedViewport(state, view) {
      state.selectedViewport = view;
    },
  },
};
