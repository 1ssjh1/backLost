import { del, get, post, put } from "../../util/axios";
import axios from "axios";
import { message } from "antd";
import { Button, notification } from 'antd';
import { stat } from "fs";

const managelose = {
  state: {
    page: 1,
    inputValue: "",
    list: [],
    dates: [],
    //flag用于绑定编辑更新
    flag: 0,
    delflag: 0,
    selectFlage:0,
    isShow: true,
    totalPage: 100,
    exportLists: [],
    loginFlag: false,
    thevisibal: false,
    showCanvas: false,
    showCanvas_card:false,
    selectedRowKeys:[],
    selectedRows:[],
    //说明inputData是个对象 null
    inputData:null,
  },
  reducers: {
    setInputValue(state, payload) {
      return {
        ...state,
        inputValue: payload,
      };
    },
    getPageData(state, payload) {
      //这里return的就是state这个参数
      return {
        ...state,
        list: [...payload],
      };
    },
    //改变页数
    pageChange(state, payload) {
      return {
        ...state,
        page: payload,
      };
    },
    success(state, payload) {
      return {
        ...state,
        flag: payload,
      };
    },
    delsuccess(state, payload) {
      return {
        ...state,
        delflag: payload,
      };
    },
    changeShow(state, payload) {
      return {
        ...state,
        isShow: payload,
      };
    },
    setTotalPage(state, payload) {
      return {
        ...state,
        totalPage: payload,
      };
    },
    setExportLists(state, payload) {
      return {
        ...state,
        exportLists: payload,
      };
    },
    changeShowCanvas(state, payload) {
      return { ...state, showCanvas: payload };
    },
    changeShowCanvas_card(state,payload){
      return {
        ...state,
        showCanvas_card:payload
      }
    },
    changethevisibal(state, payload) {
      return {
        ...state,
        thevisibal: payload,
      };
    },
    changeloginFlag(state, payload) {
      return {
        ...state,
        loginFlag: payload,
      };
    },
    getSelectedRowKeys(state,payload){
      return{
        ...state,
        selectedRowKeys:payload
      }
    },
     getSelectedRows(state,payload){
      return{
        ...state,
        selectedRows:payload
      }
    },
    selectSuccess(state,payload){
      return{
        ...state,
        selectFlage:payload
      }
    },
    //设置筛选内容
    setInputData(state,payload){
      console.log({...payload});
      return{
        ...state,
        inputData:{...payload}
      }
    },
    changeInputData(state,payload){
     
      return{
        ...state,
        inputData:{...payload}
      }
    }
  },
  effects: {
    async submitInput(payload, rootState) {
      // new Promise(())
      try {      
        const res = await post("/lost/searches",{
          ...payload
        })
        ;
        if(res.code === 0){
          let listdata = JSON.parse(
            JSON.stringify(res.data.llist).replace(/id/g, "key")
          );
          this.getPageData(listdata);
          this.setTotalPage(res.data.totalDataNum);
        }else if(res.code === 2){
          this.changethevisibal(true);
        }
      } catch(error){
        console.log(error);
        this.changethevisibal(true);
      }
    },
    async EditInput(payload, rootState) {
      //把lkey改成lid
      let editData = JSON.parse(
        JSON.stringify(payload).replace(/key/g,"id")
      )
  
      axios.put("https://we.cqupt.edu.cn/lostFound/api/lost/put", editData[0]).then((res) => {
        if (res.data.code === 0) {
          this.success(payload[1]);
          message.success('编辑成功',5)
        } else {
          message.error('编辑失败',5)
          // alert(res.message)
        }
      });
    },
    async editsData(payload,rootState){
     const res=await put("https://we.cqupt.edu.cn/lostFound/api/lost/foundAll",payload).then((res)=>{
      this.success(payload[1]);
       message.success('修改状态成功',5)
     }).catch(rea=>{       
       message.error('修改状态失败',5)
     })
    },
    async delItem(payload, rootState) {
      const res = await del("lost/delete/" + payload);
      console.log(res);
      if (res.code === 0) {
        this.delsuccess(payload);
        message.success('删除成功',5)
      } else {
        message.error('删除失败',5)
      }
    },
    //参数放在请求体中
    async delItems(payload, rootState) {
      axios({
        method: "delete",
        url: "https://we.cqupt.edu.cn/lostFound/api/lost/deletes",
        data: payload,
      }).then((res) => {
        console.log("res:",res);
        if(res.data.code === 0){
          this.delsuccess(payload.list[0]);
          message.success('删除成功',5)
        }else{
          message.error('删除失败',5)
        }
       
        
      });
    },
  
  },
};

export default managelose;
