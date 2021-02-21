const labinfo = {
  state: {
    labinfo: localStorage.labinfo ? localStorage.labinfo : ''
  },
  mutations: {
    COURSE_MAJOR_DATA_MUTATION: (state, data) => {
      localStorage.labinfo = data
      state.labinfo = data
    }
  },
  actions: {
    labinfoset({ commit, state }, data) {
      commit('COURSE_MAJOR_DATA_MUTATION', data)
    }
  }
}
export default labinfo
