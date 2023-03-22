import { get, post } from "../../util/axios";
import { setStorage, getStorage } from "../../util/index";
import {
  message
} from "antd"
const login = {
  state: {
    token: '111',
    flag: '',
    state: 0
  }, // initial state
  reducers: {
    saveToken(state, payload) {
      return {
        token: payload.data,
        flag: payload.message,
        state: state.state + 1
      }
    },
    saveflag(state, payload) {
      return {
        ...state,
        flag: payload
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
    async submitLogin(payload, rootState) {
      console.log(payload);
      const res = await post('user/login', payload)
      if (res.code === 0) {
        this.saveToken(res)
        setStorage('token', res.data)
        // this.loginTrue(res.message)
      }
      else {
        message.error(res.message);
      }
    }
  }
}
export default login;