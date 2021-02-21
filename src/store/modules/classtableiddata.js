const classtableiddata = {
  state: {
    classTableIdData: localStorage.classTableIdData ? localStorage.classTableIdData : ''
  },
  mutations: {
    CLASS_TABLE_ID_DATA_MUTATION: (state, data) => {
      localStorage.classTableIdData = data
      state.classTableIdData = data
    }
  },
  actions: {
    classtableiddataset({ commit, state }, data) {
      commit('CLASS_TABLE_ID_DATA_MUTATION', data)
    }
  }
}
export default classtableiddata
