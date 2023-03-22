import { del, get, patch } from "../../util/axios";
import { message } from "antd";

const member = {
  state: {
    state: 0,
    page: 1,
    total: 100,
    id: 2,
    inputvalue: "",
    visibal: false,
    thevisibal: false,
    //判断是否没有权限，或者登录过期
    insearch: false,
    loginFlag: false,
    //判断是否跳转到登录页面，true就跳过去
    role: "管理员",
    error: {},
    //存错误信息
    list: [],
    // 当前界面
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    //必须返回整个state
    savestate(state, payload) {
      return {
        ...state,
        state: state.state + 1,
      };
    },
    saveList(state, payload) {
      return {
        ...state,
        list: payload,
      };
    },
    saveinputvalue(state, payload) {
      return {
        ...state,
        inputvalue: payload,
      };
    },
    savetotalnum(state, payload) {
      return {
        ...state,
        total: payload,
      };
    },
    changepage(state, payload) {
      return {
        ...state,
        page: payload,
      };
    },
    changevisibal(state, payload) {
      return {
        ...state,
        visibal: payload,
      };
    },
    changeinsearch(state, payload) {
      return {
        ...state,
        insearch: payload,
      };
    },
    changeid(state, payload) {
      return {
        ...state,
        id: payload,
      };
    },
    changerole(state, payload) {
      return {
        ...state,
        role: payload,
      };
    },
    changeloginFlag(state, payload) {
      return {
        ...state,
        loginFlag: payload,
      };
    },
    saveerror(state, payload) {
      return {
        ...state,
        error: payload,
      };
    },
    changethevisibal(state, payload) {
      return {
        ...state,
        thevisibal: payload,
      };
    },
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    //此处为该接口：需审批用户的记录展示(可测试)
    async getList(payload, rootState) {
      try {
        const res = await get("/member/display", {
          currPage: payload,
        });
        console.log("111", res);
        if (res.code === 0) {
          console.log("没有报错");
          this.saveList(res.data.list);
          this.savetotalnum(res.data.totalNum);
        }else if(res.code === 2){
          console.log("res",res);
          this.saveerror(res.message);
      //     message.info(error.response.data.message);
      //  console.log(error.response);
      // this.saveerror("未登录")
      // message.info("未登录")
       this.changethevisibal(true);
        }
      } catch (error) {
        console.log(error.response.data.message);
        if (error.response) {
          console.log("抓住错误");
          this.saveerror(error.response.data.message);
          this.changethevisibal(true);
        }
      }
    },
    async deleterole(payload, rootState) {
      const res = await del(`/member/delete/${payload}`);
      this.savestate();
      message.success("删除成功");
    },
    async modifyrole(payload, rootState) {
      const res = await patch("/member/changerole", payload);
      this.savestate();
      message.success("成功");
    },
    async searchrole(payload, rootState) {
      const res = await get("member/select", payload);
      if (res.code === 0) {
        this.saveList(res.data.list);
        this.savetotalnum(res.data.totalNum);
        // this.changeinsearch(true)
        console.log();
      }
    },
    // async  judgerole(payload,rootState){
    //     const res = await get('user/userinfo',
    //     payload
    //     )

    //        if(res.data.role!='管理员'){
    //         //   message.info('抱歉，您没有权限');
    //        }

    // }
  },
};
export default member;
