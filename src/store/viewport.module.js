//const sock = io(process.env.VUE_APP_IO_URL+'viewport', {
//  query: `token=${authHeader()}`
//});

const player = {};

const players = [];


export const viewport = {
  namespaced: true,
  state: {
    isconnected : false,
    player,
    players,
    ownCam: {
     position:''
    }
  },
  actions: {
    setowncamPos({ commit },position) {
      commit('owncamPos', position);
    },
    PLAYER_newplayer({ commit, rootState }) {
      player.chatroom = rootState.curproject.theproject.id.toString();
      this._vm.$socket.emit('newplayer', player);
      commit("PLAYER_NEWPLAYER");
    },
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
  },
  mutations: {
    owncamPos( state, position){
    state.ownCam.position = position
    },
    PLAYER_NEWPLAYER(state) {
      state.isconnected = true;
    }
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



