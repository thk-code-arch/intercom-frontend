export const viewport = {
  namespaced: true,
  state: {
    ownCam: {
     position:''
    }
  },
  actions: {
    setowncamPos({ commit },position) {
      commit('owncamPos', position);
    }
  },
  mutations: {
    owncamPos( state, position){
    state.ownCam.position = position
    }
  }
};

