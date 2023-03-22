/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2021-02-14 19:14:59
 */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {
  Link,
  Route,
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Sider from "./component/Sider";
import {  } from "react-router-dom";
import ApproveContainer from "./page/approve";
import About from "./page/about";
import Add from "./page/add";
import Exit from "./page/exit";
import Information from "./page/information";
import Member from "./page/member";
import Record from "./page/record";
import style from "./index.module.less";
import { Layout, Modal } from "antd";

const { Header, Content } = Layout;

const Index = (props) => {
  //判断网络状态
  // const history = useHistory()
  const navigate = useNavigate()
  const [netStatus, setNetStatus] = useState(window.navigator.onLine);
  const updateNetStatus = () => {
    setNetStatus(window.navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", updateNetStatus);
    window.addEventListener("offline", updateNetStatus);

    return () => {
      window.removeEventListener('online',updateNetStatus)
      window.removeEventListener('offline',updateNetStatus)
    };
  });
  useEffect(()=>{
    if(!netStatus){
      Modal.error({
        title: 'error',
        content: '请检查网络是否连接',
        afterClose:()=>{
          navigate('/')
        }
      });
    }
  },[netStatus])
 
  return (
    <div>
      <Layout>
        <Header className={style.header}>
          <div className={style.logo}>
            {/* <FolderOpenTwoTone className={style.logofont} /> */}
            <span className={style.font}>失物招领后台管理系统</span>
          </div>
        </Header>
        <div className={style.container}>
          <Sider width={200}></Sider>
          <Layout>
            <div className={style.switch}>
              {/* <Router> */}
              <Routes
                className={style.switch}
                style={{ padding: "0 24px 24px" }}
              >
                <Route path="about" element={<About />} />
                <Route path="add/*" element={<Add />} />
                <Route path="exit/*" element={<Exit />} />
                <Route path="information/*" element={<Information />} />
                <Route path="member/*" element={<Member />} />

                <Route path="approve/*" element={<ApproveContainer />} />
                <Route path="record/*" element={<Record />} />
              </Routes>
              {/* <Outlet /> */}
              {/* </Router> */}
            </div>
          </Layout>
        </div>
      </Layout>
    </div>
  );
};

const mapState = (state) => ({
  count: state.count,
});

const mapDispatch = (dispatch) => ({});

const IndexContainer = connect(mapState, mapDispatch)(Index);
export default IndexContainer;
