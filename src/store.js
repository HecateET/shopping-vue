import Vue from "vue"
import Vuex from  "vuex"
Vue.use(Vuex);

function isLogin() {
  var login = {};
  login.managerId = localStorage.getItem("managerId");
  if (login.managerId) {
    login.isLogin = true;
  } else {
    login.isLogin = false;
  }
  return login;
}

export default new Vuex.Store({
  state:{
    managerId:isLogin().managerId,
    isLogin:isLogin().isLogin,
    baseURL:"http://localhost:3000",
    vueBaseURL:"http://localhost:8080"

  },
  getters:{
    isLogin(state){
      return state.isLogin;
    },
    managerId(state){
      return state.managerId;
    }
  },
})