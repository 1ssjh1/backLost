import { get, post } from "../../util/axios";
import { setStorage, getStorage } from "../../util/index";
 const login = {
  state:{
    state:2,
    token:'111',
    flag:''
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload
    },
    saveToken(state, payload) {
      return{
        token:payload.data,
        flag:payload.message
      }
    },
    // loginTrue(state,payload){
    //   return{
    //     flag:payload
    //   }
    // }
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment(payload)
    },
    async submitLogin(payload, rootState) {
      const res =  await post('user/login', payload)
      if(res.code === 0) {
        this.saveToken(res)
        setStorage('token', res.data)
        // this.loginTrue(res.message)
      }
      else {
        alert(res.message);
      }
    }
  }
}
export default login;