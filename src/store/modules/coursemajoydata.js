const coursemajordata = {
  state: {
    courseMajorData: localStorage.courseMajorData ? localStorage.courseMajorData : ''
  },
  mutations: {
    COURSE_MAJOR_DATA_MUTATION: (state, data) => {
      localStorage.courseMajorData = data
      state.courseMajorData = data
    }
  },
  actions: {
    coursemajordataset({ commit, state }, data) {
      commit('COURSE_MAJOR_DATA_MUTATION', data)
    }
  }
}
export default coursemajordata
