import React, { useEffect, useState } from "react";
import withRouter from "../../../../../util/useWithRouter";
import {
  Form,
  Select,
  Input,
  Button,
  Upload,
  message,
  Layout,
  Image,
} from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import style from "./index.module.less";
import { connect } from "react-redux";
import { configSelect, configLid } from "./config";

const { Content } = Layout;

const renderSelect = (optionSelect) => {
  let selectHtml = "";
  selectHtml = optionSelect.map((item, index) => {
    return (
      <Option key={item.key} value={item.value}>
        {item.value}
      </Option>
    );
  });
  return selectHtml;
};

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
  key: "asdas",
};

const lid_config = [];

//映射地址
const getLid = () => {
  //获取编号日期
};

//传文件
//姓名和地址是必填项
const Add = (props) => {
  const [form] = Form.useForm();
  // const [llist,setLlist] = useState(initialvalues)
  const { ListData, addDispatch } = props;
  console.log(ListData);
  const onFinish = (values) => {
    //清空表单
    props.ListData.lostImg = "";
    form.resetFields();
    addDispatch.submitAdd(values);
    // setIsShowImg(false);
    addDispatch.setIsShowImg(false)
  };

  // const [formData, setformData] = useState({});
  console.log("a");
  var [isRender, setIsRender] = useState(false);
  // var [isShowImg, setIsShowImg] = useState(false);
  useEffect(() => {
    // window.addEventListener()
    // if (isRender) {
    if (isRender) {
      if (JSON.stringify(props.ListData.llist[0]) != "{}") {
        console.log(props.ListData.llist[0]);
        let lid;
        for (let i = 0; i < configLid.length; i++) {
          if (ListData.llist[0].takeLocation.indexOf(configLid[i].key) != -1) {
            lid = configLid[i].value;
          }
        }
        console.log(ListData.llist[0]);
        form.setFieldsValue({
          lid,
          lostName: "一卡通",
          stuName: ListData.llist[0].stuName,
          stuId: ListData.llist[0].stuId,
          stuCollege: ListData.llist[0].stuCollege,
          takeLocation: ListData.llist[0].takeLocation,
        });
      }
    }

    return () => {
      //  var temp = {totalDataNum: 0,llist:[{}]}
      //  props.addDispatch.saveListData({})
      console.log("b");
      setIsRender(false);
      // setIsShowImg(false);
    };
  }, [props.ListData.llist]);

  const ShowPic = () => {
    const getList = () => {
      console.log("获取");
      addDispatch.getListData();
      setIsRender(true);
      addDispatch.setIsShowImg(true)
      // setIsShowImg(true);
    };
    //ListData.llist是使用队列结构 每次获取过后第一条数据就会出队

    console.log(props.ListData);
    return (
      <span>  </span>
      // <div className={style.ImgContainer}>
      //   {props.isShowImg ? (
      //     <Image width={200} src={ListData.llist[0].lostImg}></Image>
      //   ) : null}
      //   <Button onClick={getList}>获取</Button>
      // </div>
    );
  };

  return (
    <Content
      className={style.addoneContainer}
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <Form
        // initialValues = {initialValues}
        form={form}
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
      >
        <Form.Item name="lid" label="编号">
          <Input placeholder="点击输入编号" style={{ width: "450px" }} />
        </Form.Item>
        <Form.Item name="lostName" label="失物名称">
          <Input
            placeholder="(默认为一卡通，点击修改)"
            initialvalues="一卡通"
            style={{ width: "450px" }}
          />
        </Form.Item>
        <Form.Item
          name="stuName"
          label="失主姓名"
          rules={[
            {
              key: "loseName",
              required: false,
            },
          ]}
        >
          <Input
            placeholder="点击输入姓名"
            allowClear="true"
            style={{ width: "450px" }}
          />
        </Form.Item>
        <Form.Item
          name="stuId"
          label="失主学号"
          rules={[
            {
              len: 10,
              message: "学号位数为10位",
              key: "stuId",
              required: true,
            },
          ]}
        >
          <Input
            placeholder="点击输入学号信息"
            allowClear="true"
            style={{ width: "450px" }}
          />
        </Form.Item>
        <Form.Item
          name="stuCollege"
          label="失主学院"
          hasFeedback
          rules={[
            {
              key: "loseCollege",
              required: true,
              message: "请选择",
            },
          ]}
        >
          {/* 改成循环 */}
          <Select
            showSearch
            optionFilterProp="children"
            style={{ width: "450px" }}
            placeholder="请输入"
          >
            {renderSelect(configSelect)}
          </Select>
        </Form.Item>
        <Form.Item
          name="takeLocation"
          label="领取地址"
          rules={[
            {
              key: "loseSite",
              required: true,
            },
          ]}
        >
          <Input
            placeholder="点击输入地址"
            allowClear="true"
            style={{ width: "450px" }}
          />
        </Form.Item>
        {/* 
        <Form.Item 
          name="file"
          label="上传图片"
          rules={[
            {
              key: "file",
              required: false,
            },
          ]}
        >
          <Input type="file" onChange={(e) => onChange(e)}></Input>
        </Form.Item> */}
        <Form.Item
          wrapperCol={{
            key: "aaa",
            span: 12,
            offset: 6,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              justifyContent: "center",
              width: "100px",
              marginLeft: "calc(50% - 50px)",
            }}
          >
            立即创建
          </Button>
        </Form.Item>
      </Form>
      <ShowPic className={style.showPic}></ShowPic>
    </Content>
    // </div>
  );
};

const mapState = (state) => ({
  // state: state.singleInfo,
  ListData: state.add.listData,
  isShowImg: state.add.isShowImg,
});

const mapDispatch = (dispatch) => ({
  addDispatch: dispatch.add,
});
const Addone = connect(mapState, mapDispatch)(Add);
export default withRouter(Addone);
