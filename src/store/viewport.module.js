import io from 'socket.io-client';
import authHeader from '@/services/auth-header';
const sock = io(process.env.VUE_APP_IO_URL+'viewport', {
  query: `token=${authHeader()}`
});

const player = {};

const players = [];


export const viewport = {
  namespaced: true,
  state: {
    sock,
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
    newplayer({ commit }) {
      sock.emit("new-player", player, p => {
        commit("updatePlayer", p);
      });
    },
    listplayer({ commit }) {
      sock.on("list-players", players => {
        commit("updatePlayers", players);
      });
    },
    move({ commit }) {
      commit("moveTo");
    },
    byebye() {
      sock.emit("bye-bye");
    }
  },
  mutations: {
    owncamPos( state, position){
    state.ownCam.position = position
    },
    updatePlayer(state, player) {
      state.player = player;
    },
    updatePlayers(state, players) {
      state.players = players;
    },
    moveTo(state) {
      const {position} = state.ownCam;
      const { sId } = state.player;
      sock.emit("move-to",{ sId, position });
    },
  }
};



