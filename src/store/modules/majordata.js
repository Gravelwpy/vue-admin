const majordata = {
  state: {
    majorData: localStorage.majorData ? localStorage.majorData : ''
  },
  mutations: {
    MAJOR_DATA_MUTATION: (state, data) => {
      localStorage.majorData = data
      state.majorData = data
    }
  },
  actions: {
    majordataset({ commit, state }, data) {
      commit('MAJOR_DATA_MUTATION', data)
    }
  }
}
export default majordata
