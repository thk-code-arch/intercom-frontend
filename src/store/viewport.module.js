export const viewport = {
  namespaced: true,
  state: {
    currentviewport: 0,
    players: [],
    camPosi: {},
    othercamPos: {},
    materials: {},
    takeScreenshot: false,
    imgDataurl: "",
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
    select_viewport({ commit }, chatID) {
      commit("Select_Viewport", chatID);
    },
    join_viewport({ commit, state }, oldroom) {
      if (state.currentviewport !== 0) {
        this._vm.$socket.viewport.emit("join_viewport", {
          oldRoom: oldroom,
          newRoom: state.currentviewport,
        });
        commit("get_players", []);
      }
    },
    push_position({ state }) {
      if (state.currentviewport !== 0) {
        this._vm.$socket.viewport.emit("moveTo", {
          position: state.camPosi,
          chatroomId: state.currentviewport,
        });
      }
      // push ownCam Position
    },
    leave_viewport({ commit, state }) {
      if (state.currentviewport !== 0) {
        this._vm.$socket.viewport.emit("disconnect", {
          chatroomId: state.currentviewport,
        });
        commit("Select_Viewport", 0);
      }
      // TODO add disconnect: emit disconnect on disconnect
      // Remove disconnect players from array
      // disconnect when destroy View
    },
    PLAYER_getplayers({ commit, rootState }, data) {
      // get all connected players in array
      let players = Object.keys(data)
        .map((key) => data[key])
        .filter((key) => key.userId !== rootState.auth.user.id);
      commit("get_players", players);
    },
    clear({ commit, state }) {
      if (state.currentviewport !== 0) {
        this._vm.$socket.viewport.emit("disconnect", {
          chatroomId: state.currentviewport,
        });
      }
      commit("clear");
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
    Select_Viewport(state, chatID) {
      state.currentviewport = chatID;
    },
    get_players(state, data) {
      state.players = data;
    },
    clear(state) {
      state.players = [];
      state.camPosi = {};
      state.othercamPos = {};
      state.currentviewport = 0;
    },
  },
};
