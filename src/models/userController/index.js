import axios from "axios";
import { get, post } from "../../util/axios";

const userController = {
  state:{
    info:'',
    personInfo:{},
    isLogin:false,
    isPop:false
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    saveInfo(state, payload) {
      return{
        info:payload
      }
    },
    getPersonInfo(state,payload){
      return{...state,
        personInfo:{
          name:payload.data.name,
          studentId:payload.data.studentId,
          phoneNumber:payload.data.phoneNumber,
          role:payload.data.role,
        }
      }
    },
    getLoginFlag(state,payload){
      return{
        ...state,
        loginFlag:payload
      }
    },
    setisPop(state,payload){
      return{
        ...state,
        isPop:payload
      }
    },
    changeloginFlag(state,payload){
      return{
        ...state,
        isLogin:payload
      }
    }
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    //此处为该接口：需审批用户的记录展示(可测试)
    async getApproveList(payload, rootState) {
      console.log(payload)
      const res =  await get(`/user/registerlist/`,
      {
        currPage: payload
      }
      )
      console.log(res)
      if(res.code === 0) {
        // this.saveToken(res.data)
        // saveInfo('token', res.data)
      }
    },
    async getPersonInfoAsync(payload,rootState){
    try{
      const res = await get('/user/userinfo')
      if(res.code === 0){
        console.log("res",res);
        this.getPersonInfo(res)
      }else if(res.code === 2){
        console.log("没有登录");
        this.setisPop(true)
      }
    }catch(error){
      this.getPersonInfo({
        data:{
          name:null,
          studentId:null,
          phoneNumber:null,
          role:null
        }
      })
      }
    }
  }
}
export default userController;