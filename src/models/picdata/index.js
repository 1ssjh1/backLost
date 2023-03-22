import { get, post } from "../../util/axios";
import { setStorage, getStorage } from "../../util/index";
 const picdata = {
  state:{
      echartsreact:{
      },
      data: {abnormal: [0],
      five: ["2021-01-03", 0],
      found:[0],
      four:  ["2021-01-04", 0],
      notFound: [0],
      one: ["2021-01-07", 0],
      seven:  ["2021-01-01", 0],
      six:  ["2021-01-02", 0],
      three: ["2021-01-05", 0],
      two:  ["2021-01-06", 0]},

  }, // initial state
  reducers: {
    // handle state changes with pure functions
  
    savedata(state,payload){
      return {
        ...state,
        data: payload,
      }
    },
    saveecharts(state,payload){
      return {
        ...state,
        echarts_react: payload,
      }
    }
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions

    async getPicdata(payload, rootState) {
        const res = await get("https://we.cqupt.edu.cn/lostFound/api/lost/week",
            {}
        )
        if (res.code === 0) {
          this.savedata(res.data)
        }
    },
  }
}
export default picdata;