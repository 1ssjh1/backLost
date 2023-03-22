//个人信息界面
import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import style from "./index.module.less";
import { Button, Avatar, Image, Modal, Input, Form } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { deleteStorage, getStorage } from "../../../../util/index";

const PersonInfo = (props) => {

    const [visible,setVisible] = useState(false);
    const [confirmLoading,setConfirmLoading] = useState(false);
    const myRef1 = useRef();
    const myRef2 = useRef();
    const myRef3 = useRef();

    useEffect(()=>{
      const { userControllerDispatch} =props;
      userControllerDispatch.getPersonInfoAsync();
    },[])

    
    const {personInfo}=props

    const handleClick=()=>{
      setVisible(true)
    }

    const handleOK= async()=>{
      setConfirmLoading(true);
      const {changePasswordDispatch}=props;
      const res = await changePasswordDispatch.sendChangePasswordAsync({
        oldPassword:myRef1.current.state.value,
        newPassword:myRef2.current.state.value,
        newPasswordAgain:myRef3.current.state.value
      });
      judgeState(res)
      /* judgeState(); */
    }

    const judgeState=(res)=>{
      if(res.code==0){
        setVisible(false);
        setConfirmLoading(false);
        alert(res.message);
        props.history.replace('/');
        deleteStorage('token');
      }
      else{
        alert(res.message);
        setConfirmLoading(false);
      }
    }


  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (value) => {
  };

  const onFinishFailed = (value) => {
  };

  return (
    <div className={style.Container}>
      {" "}
      <Fragment>
        <div className={style.container_1}>
          <div className={style.container_1_1}>
            <Avatar
              className={style.icon}
              src={
                personInfo.role == "管理员" ? (
                  <Image src='https://we.cqupt.edu.cn/app/images/core/swzl/%E7%AE%A1%E7%90%86%E5%91%98.png' width={70} />
                ) : (
                  <Image src='https://we.cqupt.edu.cn/app/images/core/swzl/%E6%99%AE%E9%80%9A%E7%94%A8%E6%88%B7.png' width={70} />
                )
              }
            />
            <br />
            <div className={style.container_1_2}>
              姓名：
              <p>{personInfo.name}</p>
            </div>
            <div className={style.container_1_2}>
              学号：
              <p>{personInfo.studentId}</p>
            </div>
            <div className={style.container_1_2}>
              联系方式：
              <p>{personInfo.phoneNumber}</p>
            </div>
            <div className={style.container_1_2}>
              {" "}
              权限：
              <p>{personInfo.role}</p>
            </div>
          </div>
      
          <div className={style.footer}>
          {/* <h3>修改密码</h3> */}
          <p className={style.footfont} >修改密码</p>
          <br />
          <Button
            type="primary"
            icon={<KeyOutlined />}
            className={style.footbtn}
            onClick={handleClick}
          >
            点击修改
          </Button>

          <Modal
            title="修改密码"
            visible={visible}
            onOk={handleOK}
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
          >
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Form.Item
                label="您的密码"
                name="oldPassword"
                rules={[
                  { required: true, message: "请输入密码" },
                  { min: 8, message: "长度至少8位" },
                ]}
              >
                <Input.Password ref={myRef1} placeholder="输入您的密码" />
              </Form.Item>
              <Form.Item
                label="您的新密码"
                name="newPassword"
                rules={[
                  { required: true, message: "请输入新密码" },
                  { min: 8, message: "长度至少8位" },
                ]}
              >
                <Input.Password
                  minLength="8"
                  ref={myRef2}
                  placeholder="输入您的新密码，不得少于8位"
                />
              </Form.Item>
              <Form.Item
                label="确认您的新密码"
                name="newPasswordAgain"
                rules={[
                  { required: true, message: "确认新密码" },
                  { min: 8, message: "长度至少8位" },
                ]}
              >
                <Input.Password
                  minLength="8"
                  ref={myRef3}
                  placeholder="再次输入您的新密码"
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      
        </div>

      </Fragment>
    </div>
  );
};
              
const mapState = (state) => ({
  // approveList = state.userController
  personInfo: state.userController.personInfo,
  changePasswordInfo: state.changePassword,
});

const mapDispatch = (dispatch) => ({
  userControllerDispatch: dispatch.userController,
  changePasswordDispatch: dispatch.changePassword,
});
export default connect(mapState, mapDispatch)(PersonInfo);
// export default withRouter(About);
