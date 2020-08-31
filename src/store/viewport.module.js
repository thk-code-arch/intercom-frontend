
export const viewport = {
  namespaced: true,
  state: {
    currentviewport:0,
    players: [],
    camPosi: {},
    othercamPos: {},
    materials:{}
  },
  actions: {
    setmaterialList({ commit },materials) {
      commit('materialList', materials);
    },
    setowncamPos({ commit },position) {
      commit('owncamPos', position);
    },
    getcamPos({ commit },position) {
      commit('othercamPos', position);
    },
    select_viewport({ commit }, chatID) {
      commit("Select_Viewport", chatID);
    },
    join_viewport({ commit, state }, oldroom) {
        console.log("join viwport socket");
      if (state.currentviewport !== 0){
        console.log("join viwport notnull");
        this._vm.$socket.viewport.emit('join_viewport',{oldRoom: oldroom, newRoom: state.currentviewport});
        commit("get_players", []);
      }
    },
    push_position({ state }) {
      if (state.currentviewport !== 0){
        this._vm.$socket.viewport.emit('moveTo',{position: state.camPosi, chatroomId: state.currentviewport});
      }
      // push ownCam Position
    },
    leave_viewport({ commit, state }) {
      if (state.currentviewport !== 0){
        this._vm.$socket.viewport.emit('disconnect',{chatroomId: state.currentviewport});
        commit("Select_Viewport", 0);
      }
      // TODO add disconnect 
      // disconnect when destroy View
    },
    PLAYER_getplayers({ commit, state, rootState }, data) {
    // get all connected players in array
    console.log(data.userid,rootState.auth.user.id);
    if (data.userid !== rootState.auth.user.id){
      var players = state.players;
      var index = players.findIndex(x => x.userid==data.userid)
      if (index === -1){
        players.push(data);
      }
      else {
        players.splice(index, 1);
        players.push(data);
      }
    commit("get_players", players);
    }
    },
    clear({commit, state}){
      if (state.currentviewport !== 0){
        this._vm.$socket.viewport.emit('disconnect',{chatroomId: state.currentviewport});
      }
      commit('clear');
    }
  },
  mutations: {
    materialList( state, materials){
    state.materials = materials;
    },
    owncamPos( state, position){
    state.camPosi = position;
    },
    othercamPos( state, position){
    state.othercamPos = position;
    },
    Select_Viewport(state, chatID ) {
      state.currentviewport = chatID;
    },
    get_players(state, data) {
      state.players = data;
    },
    clear(state) {
      state.players =[];
      state.camPosi ={};
      state.othercamPos ={};
      state.currentviewport =0;
    }
  }
};



