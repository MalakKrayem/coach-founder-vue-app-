import { createStore } from "vuex";
import coachMoudel from "./Moudels/coaches/index";
import requestMoudel from "./Moudels/requests/index";
import authMoudel from "./Moudels/auth/index";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    coach: coachMoudel,
    request: requestMoudel,
    auth: authMoudel,
  },
});
