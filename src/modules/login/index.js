/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2021-02-13 19:11:51
 */
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, message, Row, Col, Image } from "antd";
import style from "./index.module.less";
import { UserOutlined, LockOutlined } from "@ant-design/icons";


//备注
const layout = {
  wrapperCol: { offset: 6, span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
};

const Login = (props) => {
  // const history = useHistory();
  const navigate = useNavigate()
  const { loginDispatch } = props;



  useEffect(() => {
    if (props.loginFlag == "操作成功") {
      loginDispatch.saveflag("");
      navigate("/index/record");
    }
  });

  const Nav = () => {
    return (
      <>
        <Row>
          <Col span={3} offset={9}>
            <Link style={{ color: "#1890FF" }} to="/">登录</Link>
          </Col>
          <Col span={3}>
            <Link to="/register">注册</Link>
          </Col>
        </Row>
      </>
    );
  };

  const FormInfo = (props) => {

    let onFinish = (values) => {
      const { studentId, password } = values;
      //submitLogin是异步方法
      loginDispatch.submitLogin({
        studentId,
        password,
      });
    };

    const onFinishFailed = (errorInfo) => {
      message.error(errorInfo.errorFields[0].errors[0]);
    };
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      // validateMessages={validateMessages}
      >
        <Form.Item
          name="studentId"
          rules={[
            {
              required: true,
              message: "请输入学号",
            },
            {
              len: 10,
              message: "长度10位!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入学号" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
            {
              min: 8,
              message: "长度至少8位",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
        </Form.Item>

        <Row>
          <Col offset={14}>
            <Link to="/register">没有账号点击注册</Link>
          </Col>
        </Row>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit" className={style.button}>
            登录
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
  count: state.login.state,
  loginFlag: state.login.flag,
  token: state.login.token,
});

// const mapDispatch = ({ login: { increment, incrementAsync }}) => ({
//     increment: () => increment(1),
//     incrementAsync: () => incrementAsync(1)
// })
const mapDispatch = (dispatch) => ({
  loginDispatch: dispatch.login,
});

const LoginContainer = connect(mapState, mapDispatch)(Login);
export default LoginContainer;
