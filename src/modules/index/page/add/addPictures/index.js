import React, { useEffect, useState } from "react";
import style from "./index.module.less";
import { Upload, Button,message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'
// 通过文件夹上传图片，并显示至上方
function AddPictures(props) {
  const [files,setFiles]=useState([])
  const [temp,setTemp]=useState([])
  let arr=[]

  // 上传文件事件
  // const handleChange = ({ file, fileList}) =>{
  
  //   new Promise((resolver,reject)=>{
  //     let temp=fileList.map((item)=>{
  //       return item.response
  //     })
  //     resolver(temp)
  //   }).then(res=>{
  //     console.log("11111112",res);
  //     while( res.every((item)=>{
  //       return item!==undefined
  //     })){
  //       setFiles(res)
  //       message.success("上传成功");
  //       return 
  //     }
     
  //   }).catch(rea=>{
  //     console.log("2222221",rea);
  //     message.error("上传失败");
  //   })   
  
  // };
  // 上传文件事件
  // upload配置
    const uploadProps={
      accept:"image/*",
      // action:"/lost/file",
      showUploadList:false,
      multiple:true,
      beforeUpload(f,fs){
        let form = new FormData()
        form.append('file',f)
        axios.post( '/lost/file',form,{headers:{
          "Content-Type":'application/json'
        }}).then(async(res)=>{  
        console.log(res);
          arr.push(res.data)
         setTimeout(() => {
           setTemp(arr)
           return 
         }, 2000);
    
         message.success(`${f.name} 文件导入成功`);
         
  
        }).catch(err=>{
          message.error(`${f.name} 文件导入失败`);
        
        }).then(res=>{
        
         
        })
    
      
        return false
  
      }
   }
   // upload配置

  //点击图片跳转路径
  const skip=(e)=>{
    e.preventDefault();
    const w=window.open('about:blank');
    w.location.href=`${e.target.src}`
  }
   //点击图片跳转路径

      return (
          <div className={style.Container}>
          {/* 顶部显示区域 */}
          <div className={style.top}> 
          {      
            temp.map((item,index)=>{
             return( 
               <img src={item.data[0]} alt="123 " key= {index} className={style.imgs} onClick={skip } />
               )
            })      
          }
          </div>
              {/* 顶部显示区域 */}
              {/* 上传区域 */}
          <div className={style.upload}>
              <Upload
               {...uploadProps}
              //  onChange={handleChange}
               >
                 <Button   type='primary'    icon={<UploadOutlined /> }>上传多张图片</Button>
                </Upload>
            </div>
              {/* 上传区域 */}
          </div>
      )
  }
  

export default  (AddPictures)