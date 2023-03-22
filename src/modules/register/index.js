import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {  useNavigate } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Button, Tooltip, message, Row, Col } from "antd";
import style from "./index.module.less";
import {
  PhoneFilled,
  UserOutlined,
  LockOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

const layout = {
  wrapperCol: { offset: 6, span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
};

const Register = (props) => {
  // const history = useHistory();
  const navigate = useNavigate()

  useEffect(()=>{
    if(props.waitStatus){
      // history.push('/wait')
      navigate('/wait')
    }
  },[props.waitStatus])
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { studentId, password, name, phoneNumber } = values;
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        props.registerDispatch.submitregister({
          studentId,
          password,
          name,
          phoneNumber,
        });
     
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });

  };

  const onFinishFailed = (errorInfo) => {
    message.error(message.error(errorInfo.errorFields[0].errors[0]));
    //输出第一条错误信息
  };
  const Nav = () => {
    return (
      <>
        <Row>
          <Col span={3} offset={9}>
            <Link to="/">登录</Link>
          </Col>
          <Col span={3}>
            <Link style={{ color: "#1890FF" }} to="/register">
              注册
            </Link>
          </Col>
        </Row>
      </>
    );
  };
  const FormInfo = (props) => {
    return (
      <Form
        preserve={false}
        {...layout}
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Tooltip title="请输入学号">
          <Form.Item
            preserve="false"
            name="studentId"
            rules={[
              { required: true, message: "请输入学号" },
              {
                len: 10,
                message: "长度为10位",
              },
            ]}
          >
            <Input prefix={<SolutionOutlined />}  placeholder="请输入学号" />
          </Form.Item>
        </Tooltip>

        <Tooltip title="请输入密码">
          <Form.Item
            preserve="false"
            name="password"
            rules={[
              { required: true, message: "请输入密码" },
              {
                min: 8,
                message: "长度至少8位",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>
        </Tooltip>

        <Tooltip title="请输入姓名">
          <Form.Item
            preserve="false"
            name="name"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入姓名" />
          </Form.Item>
        </Tooltip>

        <Tooltip title="请输入电话">
          <Form.Item
            preserve="false"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "请输入电话",
              },
    
              {
                pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,
                message: "请输入正确的手机号",
              },
            ]}
          >
            <Input prefix={<PhoneFilled />} placeholder="请输入电话" />
          </Form.Item>
        </Tooltip>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className={style.button}>
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <div className={style.Container}>
      <span className={style.backImg}></span>
      <div className={style.login}>
        <div className={style.form}>
          <div className={style.nav}>
            <Nav />
          </div>
          <FormInfo />
        </div>
      </div>
    </div>
  );
};
// 映射state
const mapState = (state) => ({
  waitStatus:state.register.waiting
  // count: state.register.state,
});

// const mapDispatch = ({ login: { increment, incrementAsync }}) => ({
//     increment: () => increment(1),
//     incrementAsync: () => incrementAsync(1)
// })
const mapDispatch = (dispatch) => ({
  registerDispatch: dispatch.register,
});

const RegisterContainer = connect(mapState, mapDispatch)(Register);
export default RegisterContainer;
