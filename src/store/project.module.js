const theproject = JSON.parse(localStorage.getItem('project'));
const initialState = theproject

export const curproject = {
  namespaced: true,
  state: initialState,
  getters: {
    owner: state => `${state.owner}`,
  }
};

