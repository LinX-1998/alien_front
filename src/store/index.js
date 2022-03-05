import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultLoginResult = {
  token:null,
  userID:null,
  username:null,
}

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginResult: defaultLoginResult,
  },
  mutations: {
    init(state){
      let loginResult = JSON.parse(localStorage.getItem("loginResult"));
      if (loginResult !=null){
        state.loginResult = loginResult;
      }
    },
    login(state, loginResult){
      state.loginResult = loginResult;
    },
    logout(state){
      localStorage.removeItem("loginResult");
      state.loginResult = defaultLoginResult;
    }
  },
  actions: {
  },
  getters: {
    isLogin:state=>state.loginResult.userID !== null,
    userID:state=>state.loginResult.userID,
    username:state=>state.loginResult.username,
    token:state=>state.loginResult.token,
  }
})
