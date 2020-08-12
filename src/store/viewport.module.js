
export const viewport = {
  namespaced: true,
  state: {
    currentviewport:0,
    players: [],
    ownCam: {
     position:''
    }
  },
  actions: {
    setowncamPos({ commit },position) {
      commit('owncamPos', position);
    },
    select_viewport({ commit }, chatID) {
      commit("Select_Viewport", chatID);
    },
    join_viewport({ state }, oldroom) {
        console.log("join viwport socket");
      if (state.currentviewport !== 0){
        console.log("join viwport notnull");
        this._vm.$socket.viewport.emit('join_viewport',{oldRoom: oldroom, newRoom: state.currentviewport});
      }
    },
    push_position({ state }) {
      if (state.currentviewport !== 0){
        this._vm.$socket.viewport.emit('moveTo',{postition: state.ownCam.postition, chatroomId: state.currentviewport});
      }
      // push ownCam Position
    },
    leave_viewport({ commit, state }) {
      if (state.currentviewport !== 0){
        this._vm.$socket.viewport.emit('disconnect',{chatroomId: state.currentviewport});
        commit("Select_Viewport", 0);
      }
      // disconnect when destroy View
    },
    PLAYER_getplayers({ commit }, data) {
      // get all connected players in array
      console.log("getplayer",data);
      commit("get_players", data);
    },
    PLAYER_getpositions({ commit }, data) {
      // update postition in player array
      console.log("getpositions",data);
      commit("get_positions", data);
    },

/////////////////////////////////////////////////////
//    newplayer({ commit, rootState }) {
//      player.chatroom = rootState.curproject.theproject.id.toString();
//      sock.emit("connect", player, p => {
//        commit("updatePlayer", p);
//      });
//    },
//    listplayer({ commit }) {
//      sock.on("list-players", players => {
//        commit("updatePlayers", players);
//      });
//    },
//    move({ commit }) {
//      commit("moveTo");
//    },
//    byebye() {
//      sock.emit("bye-bye",player);
//    }
/////////////////////////////////////////////////////
  },
  mutations: {
    owncamPos( state, position){
    state.ownCam.position = position
    },
    Select_Viewport(state, chatID ) {
      state.currentviewport = chatID;
    },
//    updatePlayer(state, player) {
//      state.player = player;
//    },
//    updatePlayers(state, players) {
//      players = players.filter(e => e.sID !== state.player.sID);
//      state.players = players;
//    },
//    moveTo(state) {
//      const {position} = state.ownCam;
//      const { chatroom } = state.player;
//      sock.emit("move-to",{ chatroom, position });
//    },
  }
};



