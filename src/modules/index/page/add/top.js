import React from "react";
import { Button, PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import style from './index.module.less'
import Addone from './addone'
import { MenuFoldOutlined,FileOutlined, FolderOpenOutlined,FileAddOutlined } from "@ant-design/icons";


const Top = (props) => {
  let hisroute = props.props.history.location.pathname;
  if(hisroute == '/index/add')
    hisroute = "/index/add/single"
  return (
    <div className={style.topContent}>
      <PageHeader
        backIcon={< MenuFoldOutlined/>}
        className={style.site}
        extra={[
          //需要加key
          //
            <Link key="1" className={hisroute==="/index/add/single" ? style.present_Link :style.Link }  to="/index/add/single"> <FileOutlined/> 新增单条记录</Link>,
            <Link key="2"  className={hisroute==="/index/add/multiple"? style.present_Link :style.Link }  to="/index/add/multiple"> <FolderOpenOutlined/> 批量导入</Link>,
            <Link key="3"   className={hisroute==="/index/add/pictures"? style.present_Link:style.Link }  to="/index/add/pictures" ><FileAddOutlined />导入图片</Link>
          
          ]}
      />
      {/* <Addone/> */}
    </div>
  );
};

export default Top;
