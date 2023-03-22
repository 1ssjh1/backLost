import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Upload, message, Button } from "antd";
import { FileOutlined, UploadOutlined } from "@ant-design/icons";
import { getStorage } from '../../../../../util/index'
import style from "./index.module.less";
import axios from "axios";
import { resolve } from "dns";
import { rejects } from "assert";

const { Dragger } = Upload;

const token = getStorage('token')
const Add = (props) => {
  // const handleBeforeUpload = (file) => {
  //   console.log("type",file.type)
  //   //限制图片 格式
  //   const isxlsx = file.type === 'image/gif';
  //   if (!isxlsx) {
  //     message.error(
  //      '只能上传xlxs格式的图片~',
  //     );
  //     return;
  //   }
  //   return true;
  // };
  const options = {
    accept: ".xlsx",
    name: "file",
    multiple: true,
    beforeUpload(f,fs){
      let form = new FormData()
      form.append('file',f)
      axios.post( '/lost/adds',form,{headers:{
        "Content-Type":'multipart/form-data',
        token
      }}).then(res=>{
        console.log(res);
        message.success(`${f.name} 文件导入成功`);

      }).catch(err=>{
        message.error(`${f.name} 文件导入失败`);

      })
      return false

    }
  };
  
  //首先监听input框的变动，选中一个新的文件会触发change事件
  const get = () => {
    axios.get("http://zzc0309.top:8085/message/list").then((res) => {
      console.log("res", res);
    })
  }

  // const getLists = (file, fileList) => {
  //   console.log("__fileList", fileList);
  //   return new Promise((resolve, rejects) => {
  //     for (const item of fileList) {
  //       item.name = `${item.uuid}.png`
  //     }
  //     console.log("file", file);
  //     console.log("fileList", fileList);
  //     resolve(file)
  //   })
  // }

  return (
    <div className={style.Container}>
      <p className={style.font}>
        {" "}
        <UploadOutlined style={{ color: "#08c", fontSize: 30 }} /> 导入文件
      </p>
      <div className={style.uploadContainer}>
        <Dragger className={style.uploadFile} {...options}>
          <p className="ant-upload-drag-icon">
            <FileOutlined />
          </p>
          <p className="ant-upload-hint">
            将文件拖入虚框内上传，支持windows表单格式xlsx
          </p>
        </Dragger>
      </div>
      {/* <button onClick={get}>get请求</button> */}
      {/* <Upload action="http://127.0.0.1:7001/addHead" directory> */}
      {/* <Upload action="https://we.cqupt.edu.cn/lostFound/api/lost/file" headers={{ "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDE4MDAwMDAwIiwiaXNzIjoiTWVyY2VySlIiLCJpZCI6OTgsImV4cCI6MTYzNTE1NjU0NCwiaWF0IjoxNjM1MTUyOTQ0fQ.nWTx4KoKfrwkY0wPlKdSCJH2kaWbzZ22aYIQvlH1PqY", }} directory> */}
        {/* zzc0309.top:8085/lost/file */}
        {/* <Button icon={<UploadOutlined />}>Upload Directory</Button> */}
      {/* </Upload> */}
    </div>
  );
};

const mapState = (state) => ({
  state: state,
});

const mapDispatch = (dispatch) => ({
  file: dispatch.loadFile,
});
// export default withRouter(Addmuch);
const Addmuch = connect(mapState, mapDispatch)(Add);
export default Addmuch;
