import { post, get } from "../../util/axios";
import axios from "axios";
import { message } from "antd";

const add = {
  state: {
    addFlage: false,
    listData: {
      totalDataNum: 0,
      llist: [
        {
          id: 0,
          lid: "",
          lostName: "",
          stuId: "",
          stuCollege:'',
          takeLocation:'',
          lostImg:'',
          status:'',
          createTime:null,
          foundTime:null,
          updateTime:null,
          lostDescription:null
        }
      ],
      // isRender:false
      isShowImg:false
    },
    // addSuccess:false
  },
  reducers: {
    // success(state,payload){
    //   return{
    //     ...state,
    //     addSuccess:payload
    //   }
    // },
    saveInfo(state, payload) {
      return {
        ...state,
        info: payload,
      };
    },
    changeFlage(state, payload) {
      return {
        ...state,
        addFlage: payload,
      };
    },
    saveListData(state, payload) {
      return {
        ...state,
        listData: payload,
      };
    },
    setIsRender(state,payload){
      return{
        ...state,
        isRender:payload
      }
    },
    setIsShowImg(state,payload){
      return{
        ...state,
        isShowImg:payload
      }
    }
  },
  effects: {
    async submitAdd(payload, rootState) {
      this.changeFlage(true);
      payload.lostDescription = "    ";
      payload.imgType = "png";
      console.log(payload);
      axios({
        method: "post",
        url: "/lost/add",
        params: { ...payload },
        data: payload.file,
        transformRequest: [
          function (data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          },
        ],
      })
        .then((res) => {
          // this. success(true)
          this.changeFlage(false);
          message.success("增加成功");
        })
        .catch((err) => {
          message.error("操作失败");
        });
    },
    async getListData(payload, rootState) {
      const res = await get("/lost/ocr");
      console.log(res);
      if (res.code == 5) {
        this.setIsShowImg(false)
        message.info("暂时没有数据传入");
      } else if (res.code == 0) {
        this.setIsShowImg(true)
        message.success("获取成功");
        // this.setIsRender(true)
        this.saveListData(res.data);
      }
    },
  },
};
export default add;
