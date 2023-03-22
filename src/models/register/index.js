import { get, post } from "../../util/axios";
import { setStorage, getStorage } from "../../util/index";
import {message} from  'antd';
 const register = {
  state:{
    state:2,
    waiting:false
  }, // initial state
  reducers: {
    setWaitStatus(state,payload){
      return({
        waiting:payload
      })
    }
    // handle state changes with pure functions

  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async submitregister(payload, rootState) {
      const res =  await post('user/register', payload)
      //等待审批
      if(res.code === 4){
        this.setWaitStatus(true)
      }
      else{
        message.info(res.message+'请重新注册');
      }
     
    }
  }
}
export default register;