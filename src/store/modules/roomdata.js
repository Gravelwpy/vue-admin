const roomdata = {
  state: {
    roomData: localStorage.roomData ? localStorage.roomData : ''
  },

  mutations: {
    ROOM_DATA_MUTATION: (state, data) => {
      console.log('localStorage1:' + data)
      localStorage.roomData = data
      state.roomData = data
      console.log('localStorage2:' + localStorage.roomData)
    }
  },

  actions: {
    roomdataset({ commit, state }, data) {
      commit('ROOM_DATA_MUTATION', data)
    }
  }
}

export default roomdata
