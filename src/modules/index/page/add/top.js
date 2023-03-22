import React from "react";
import { Button, PageHeader, Breadcrumb } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from './index.module.less'
import Addone from './addone'
import { MenuFoldOutlined,FileOutlined, FolderOpenOutlined,FileAddOutlined } from "@ant-design/icons";


const Top = (props) => {
  const location = useLocation()
  const locations = location.pathname.split('/')
  // console.log('aa',location.pathname);
  let hisroute = `/${locations[2]}/${locations[3]}`;
  // console.log(hisroute);
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
            <Link key="1" className={hisroute==="/index/add/single" ? style.present_Link :style.Link }  to="/lost/index/add/single"> <FileOutlined/> 新增单条记录</Link>,
            <Link key="2"  className={hisroute==="/index/add/multiple"? style.present_Link :style.Link }  to="/lost/index/add/multiple"> <FolderOpenOutlined/> 批量导入</Link>,
            <Link key="3"   className={hisroute==="/index/add/pictures"? style.present_Link:style.Link }  to="/lost/index/add/pictures" ><FileAddOutlined />导入图片</Link>
          
          ]}
      />
      {/* <Addone/> */}
    </div>
  );
};

export default Top;
