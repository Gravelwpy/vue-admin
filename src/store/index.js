import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import roomdata from './modules/roomdata'
import majordata from './modules/majordata'
import coursemajordata from "./modules/coursemajoydata";
import classtableiddata from "./modules/classtableiddata";
import labinfo from "./modules/labinfo";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    roomdata,
    majordata,
    coursemajordata,
    classtableiddata,
    labinfo
  },
  getters
})

export default store
