import { get, post } from "../../util/axios";
import { setStorage, getStorage } from "../../util/index";
import { message } from 'antd'
const approve = {
  state: {
    state: 1,
    page: 1,
    total: 100,
    selectedRowKeys: {},
    pages:[],
    //记录跨了那几页选取数据
    thevisibal: false,
    //弹窗显示标志
    error: {},
    loginFlag: false,
    //是否登录标志
    list: []

  }, // initial state
  reducers: {
    // handle state changes with pure functions
    changepages(state, payload){
      return {
        ...state,
        pages: payload,
      }
    },
    changepage(state, payload) {
      return {
        ...state,
        state: state.state + 1,
        page: payload,
      }
    },
    changeRowKeys(state, payload) {
      return {
        ...state,
        selectedRowKeys: Object.assign(state.selectedRowKeys,payload),
      }
    },
    savestate(state, payload) {
      return {
        ...state,
        state: state.state + 1,
      }
    },
    saveList(state, payload) {
      return {
        ...state,
        list: payload,
      }
    },
    savetotalnum(state, payload) {
      return {
        ...state,
        total: payload,
      }
    },
    saveerror(state, payload) {
      return {
        ...state,
        error: payload
      }
    },
    changeloginFlag(state, payload) {
      return {
        ...state,
        loginFlag: payload
      }
    },
    changethevisibal(state, payload) {
      return {
        ...state,
        thevisibal: payload
      }
    },
    clearselectedRowKeys(state, payload) {
      return {
        ...state,
        selectedRowKeys: {},
        pages:[]
      }
    }
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async getApproveList(payload, rootState) {
      try {
        const res = await get('/user/registerlist',
          {
            currPage: payload
          }
        )    
        if(res.code===0){
          this.saveList(res.data.list)
          this.savetotalnum(res.data.totalNum)
        }else if(res.code===2){
          this.saveerror(res.message);
          this.changethevisibal(true)
        }   
         
        // if (res.code == 2) {
          
        // }
      } catch (error) { 

         if(error.response){
          this.saveerror(error.response.data.message)
          //    message.info(error.response.data.message);
          this.changethevisibal(true)
         }
       
      }

    },
    async submitregister(payload, rootState) {
      const res = await post('user/approve',
        payload)
      if (res.code === 0) {
        this.savestate(this.state)
        this.clearselectedRowKeys()

      }

    },
  }
}
export default approve;