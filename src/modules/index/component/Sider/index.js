/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2021-02-15 20:22:49
 */

import React, {useState,useEffect} from 'react'
import { Menu,Avatar,message,Modal} from 'antd';
import {PoweroffOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom'
import configMenu from "./config";
import memberconfigMenu from "./memberconfig";
import style from "./index.module.less";
import {connect} from 'react-redux'
const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const Sider = (props) => {
  console.log(props);
  // const history = useHistory()
  const navigate = useNavigate()
  const location = useLocation()
  const {selectItem,setSelectItem,changeShow} = props
 
  const renderSide = (optionSide) => {
    let sideHtml = ''
    sideHtml =  optionSide.map((sub, i) => {
      return (
        <SubMenu key={sub.key} icon={sub.icon} title={sub.title}>
          {
              sub.children.map((item, i ) => {
                return (
                  <Menu.Item key={item.key}>{item.title}</Menu.Item>
                )
              })
          }
        </SubMenu>
      )
    })
    return sideHtml
  }
  // let hisroute = props.history.location.pathname;


  const handleClick = e => {
    if(e.key == 'record'){
      changeShow(true)
    }
    setSelectItem(e.key)
    navigate(`/lost/index/${e.key}`)
  };

  useEffect(()=>{
    const {userController} = props;
    userController.getPersonInfoAsync();
  },[])

  useEffect(()=>{
    if(props.isLogin){
      props.userController.changeloginFlag(false)
      props.userController.setisPop(false);
    }
  },[props.isLogin])
  const Jumpmessage = () => {

    const handleCancel = () => {
      props.userController.setisPop(false);
      message.info('已取消');
    };

    return (
      <Modal
        visible={props.isPop}
        title="提示信息"
        okText="确定"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          props.userController.changeloginFlag(true)
          navigate('/')

        }}
      >
        <p>登录已过期，请重新登录</p>
      
      </Modal>
    );
  };

  //监听选中项变化
  const [selects,getSelcet] = useState('record')
   
  useEffect(()=>{
    
    const start_url = location.pathname;
    var b = start_url.substr(start_url.lastIndexOf("/") + 1);
    setSelectItem(b)
    // alert(/[^\\]+$/.exec(window.location.href))
  },[])

  useEffect(()=>{
    getSelcet(selectItem)
    
  },[selectItem])

  const {personInfo}= props;

  return (
    <div className={style.container}>
    <div className={style.container_1}>
    <div className={style.container2}>
    <Avatar size={64} src={personInfo.role=='管理员'?'https://we.cqupt.edu.cn/app/images/core/swzl/%E7%AE%A1%E7%90%86%E5%91%981.png':'https://we.cqupt.edu.cn/app/images/core/swzl/%E6%99%AE%E9%80%9A%E7%94%A8%E6%88%B71.png'}></Avatar>
    </div>
    <div className={style.container3}>
    <p className={style.fontName} >姓名:{personInfo.name}</p><br/>
    <p className={style.fontId}>学号:{personInfo.studentId}</p>
    </div>
    </div>
    <Jumpmessage/>
    <Menu 
        mode="inline"
        // openKeys={props.selectItem} 
        style={{ width: 210 }}
        defaultOpenKeys={['sub1']}
        onClick={handleClick}
        className={style.side}
        selectedKeys={selects}
    >
      {personInfo.role=='管理员'?renderSide(configMenu):renderSide(memberconfigMenu)}
      <Menu.Item key='exit' icon={<PoweroffOutlined  />}>退出登录</Menu.Item>
    </Menu>
    </div>
  );

}

const mapState=(state)=>({
  personInfo:state.userController.personInfo,
  selectItem:state.common.selectItem,
  isLogin:state.userController.isLogin,
  isPop:state.userController.isPop
})

const mapDispatch=(dispatch)=>({
  userController:dispatch.userController,
  setSelectItem:dispatch.common.setSelectItem,
  setisPop:dispatch.userController.setisPop,
  changeShow:dispatch.manageLose.changeShow
})

export default connect(mapState,mapDispatch)(Sider)