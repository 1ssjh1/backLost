import { get, post } from "../../util/axios";
 const common = {
  state:{
    info:'',
    //默认一进来选中失物列表
    selectItem:'record'
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    saveInfo(state, payload) {
      return{
        ...state,
        info:payload
      }
    },
    setSelectItem(state,payload){
      return{
        ...state,
        selectItem:payload
      }
    }
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async getInfo(payload, rootState) {
      const res =  await get('api/user/register', payload)
      console.log(res)
      if(res.code === 0) {
        this.saveToken(res.data)
        // saveInfo('token', res.data)
      }
     
    }
  }
}
export default common;