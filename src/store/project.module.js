import ProjectService from '../services/project.service';
const theproject = JSON.parse(localStorage.getItem('project'));
console.log(theproject)
const initialState = theproject

export const curproject = {
  namespaced: true,
  state: initialState,
  actions: {
    selectProject({ commit }, theproject) {
      return ProjectService.selectProject(theproject).then(
        theproject => {
          commit('selectSuccess', theproject);
          return Promise.resolve(theproject);
        }
      );
    },
  },
  getters: {
    owner: state => `${state.owner}`,
  }
};

