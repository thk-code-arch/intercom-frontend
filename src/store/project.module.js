import ProjectService from '../services/project.service';
const theproject = JSON.parse(localStorage.getItem('project'));
console.log("loaded project mmodule",theproject);


const initialState = theproject
  ? { status: { Projectselected: true }, theproject }
  : { status: { Projectselected: false }, theproject: null };

export const curproject = {
  namespaced: true,
  state: initialState,
  actions: {
    selectProject({ commit }, theproject) {
      return ProjectService.selectProject(theproject).then(
        theproject => {
          commit('selectSuccess', theproject);
          return Promise.resolve(theproject);
        },
        error => {
          commit('selectFailure');
          return Promise.reject(error);
        }

      );
    },
    addnewProject({ commit }) {
      return ProjectService.addProject().then(
        theproject => {
          commit('selectSuccess', theproject);
          return Promise.resolve(theproject);
        },
        error => {
          commit('selectFailure');
          return Promise.reject(error);
        }

      );
    },
    unselect({ commit }) {
      localStorage.removeItem('project');
      commit('unselect');
    }
  },
  mutations: {
    selectSuccess(state, theproject) {
      state.status.Projectselected = true;
      state.theproject = theproject;
    },
    selectFailure(state) {
      state.status.Projectselected = false;
      state.theproject = null;
    },
    unselect(state) {
      state.status.Projectselected = false;
      state.theproject = null;
    }
  }

};

