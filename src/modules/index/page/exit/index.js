//退出界面

import React from "react";
import { connect } from "react-redux";
import { Button, message } from "antd";
import style from "./index.module.less";
import { deleteStorage } from "../../../../util/index";

const Exit = (props) => {
  const { userControllerDispatch } = props;

  const handleClick = () => {
    deleteStorage("token");
    message.success({
      content: "您已退出登录",
      duration: 1,
      onClose: () => {
        // props.history.replace("/");
        props.history.push("/")
      },
      style: {
        marginTop: "10rem",
      },
    });
  };

  return (
    <div className={style.container} key={props.location.key}>
      <div className={style.wrap}>
        <h1>是否确认退出登录!</h1>
        <br />
        <Button
          size="small"
          type="primary"
          className={style.btn}
          onClick={handleClick}
        >
          确认
        </Button>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  // approveList = state.userController
});

const mapDispatch = (dispatch) => ({
  userControllerDispatch: dispatch.userController,
});
export default connect(mapState, mapDispatch)(Exit);
// export default withRouter(About);
//直接输出 connect之后的Exit组件 此时Exit为路由组件，不必绑定withRouter即可刷新
