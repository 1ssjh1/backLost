//关于我们界面
import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { Typography, PageHeader, Row, Col, Image } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import style from "./index.module.less";
import weUrl from "../../../assets/image/logo-eac3f9c718.png";
import loseUrl from "../../../assets/image/losePic.png";
import withRouter from "../../../../util/useWithRouter";
const AboutUs = (props) => {
  const { Paragraph, Title, Text } = Typography;
  
  return (
    <div className={style.aboutContainer} >
      <PageHeader
        style={{ border: " 1px solid rgb(235, 237, 240)" }}
        backIcon={<MenuFoldOutlined />}
        className="site-page-header"
        title="  "
      />
      <Title level={3} style={{ textAlign: "center", marginTop: "5vh" }}>
        便捷寻找失物
      </Title>
      <Row justify="center">
        <Text>失物招领部门 ✖ we重邮</Text>
      </Row>

      <Row justify="space-around" style={{ marginTop: "5vh" }}>      
        <Col
          style={{
            position: "relative",
            height: "450px",
            width: "300px",
            marginBottom:"15px",
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
            backgroundColor: "#F6F6F6",
          }}
        >
          <Image width={180} className={style.loseImg} src='https://we.cqupt.edu.cn/app/images/core/swzl/losePic.png'></Image>
          <div className={style.Content}>
            <Title level={3} style={{ textAlign: "center", marginTop: "5vh" }}>
              失物招领部门
            </Title>
            <Paragraph style={{ padding: "0px 30px 30px 30px" }}>
              <p
                style={{
                  textAlign: "center",
                  margin: "5px",
                  fontSize: "small",
                }}
              >
                勤工助学中心失物招领部-部门介绍
              </p>
              <p style={{ margin: "5px", fontSize: "small" }}>
                {" "}
                1、负责全校失物招领和失物委托地运营工作；
              </p>
              <p style={{ margin: "5px", fontSize: "small" }}>
                2、线下值班登记、寻找失物，线上管理失物群、发布失物消息；
              </p>
              <p style={{ margin: "5px", fontSize: "small" }}>
                3、负责借物系统、暖心寄存、失物送到家的工作。
              </p>
            </Paragraph>
          </div>
        </Col>
      
        <Col
          style={{
            height: "450px",
            width: "300px",
            marginBottom:"15px",
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
            backgroundColor: "#F6F6F6",
          }}
        >
          <Image className={style.weImg} width={150} src='https://we.cqupt.edu.cn/app/images/core/swzl/logo-eac3f9c718.png'></Image>
          <div className={style.Content}>
            <Title level={3} style={{ textAlign: "center", marginTop: "5vh" }}>
              we重邮{" "}
            </Title>
            <Paragraph style={{ padding: "0px 30px 30px 30px" }}>
              <p style={{ margin: "5px", fontSize: "small" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We重邮
                是一款微信小程序，由重庆邮电大学教育信息化研发中心开发，有别于公众号的一种全新的连接用户与服务的方式，无需下载与安装即可在微信内被便捷地获取和传播
                ，同时具有出色的使用体验。
              </p>
            </Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});
const About = connect(mapState, mapDispatch)(withRouter(AboutUs));
export default About;
// export default withRouter(About);
