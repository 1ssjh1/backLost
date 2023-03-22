import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Modal,
  Pagination,
  Button,
  DatePicker,
  Badge,
  Collapse,
  message,
  Layout,
  Spin,
  Checkbox,
  Divider,
  Col,
  Row,
  Radio,
  Skeleton,
  Switch,
  Avatar,
} from "antd";
import { connect } from "react-redux";
import style from "./index.module.less";
import { UpOutlined, DownOutlined, CloseOutlined } from "@ant-design/icons";
import {  Redirect, withRouter } from "react-router-dom";
import { Prompt, useNavigate } from "react-router";

// import Checkbox from "antd/lib/checkbox/Checkbox";
import moment from "moment";
//EditableCell

const { Content } = Layout;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: false,
              // message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
//失物记录一般组件
const Tables = (props) => {
  const {
    pagelist,
    pageDispatch,
    editDispatch,
    delDispatch,
    delsDispatch,
    pageChangeDispatch,
    changeCanvas,
    memberDispatch,
    member,
    setInputData,
    inputData,
    changeInputData,
    selectedRowKeys,
    _selectedRows,
    selectedRowsDispatch,
    selectedRowKeysDispatch,
    editsDispatch
  } = props;

  //日历输入

  //日历

  const { RangePicker } = DatePicker;

  const dateFormat = "YYYY-MM-DD";

  const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
  const getColumnSearchProps = (dataIsndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className={style.dateContainer}>
        <RangePicker onChange={dateChange} format={dateFormat} />
      </div>
    ),
  });

  const dateChange = (date, dateString) => {
    if (date == null) {
      //把inputData里的日期删掉
      let obj = {};
      obj = inputData;
      delete inputData.startDate;
      delete inputData.endDate;
      setInputData(obj);
      pageDispatch({
        ...inputData,
        pageNum: pagelist.page,
      });
      selectedRowsDispatch([]);
      selectedRowKeysDispatch(null);
      return;
    }
    // let temp = Object
    let temp = {};

    for (var keyc in inputData) {
      if (inputData.hasOwnProperty(keyc) === true) {
        temp[keyc] = inputData[keyc];
      }
    }
    temp.startDate = dateString[0];
    temp.endDate = dateString[1];
    selectedRowsDispatch([]);
    selectedRowKeysDispatch(null);
    setInputData(temp);
  };

  //删除
  const handleDel = (options) => {
    delDispatch(options.key);
  };

  //编辑部分
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  //编辑
  const edit = (record) => {
    form.setFieldsValue({
      createTime: "",
      lostName: "",
      stuName: "",
      stuId: "",
      status: "",
      takeLoaction: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  //取消编辑
  const cancel = () => {
    setEditingKey("");
    console.log("取消");
  };

  //确认编辑
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...pagelist.list];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        //不允许更改初始时间
        if (item.createTime !== row.createTime) {
          message.error("导入时间不可更改");
          return;
        }
        if (
          row.status != "已找回" &&
          row.status != "未找回" &&
          row.status != "异常"
        ) {
          message.error("失物状态只能编辑为已找回、未找回或者异常");
          return;
        }
        //在newData数组中第index个位置删除一个，用row代替
        newData.splice(index, 1, { ...item, ...row });
        row.id = item.key;
        // const [data, setData] = useState(originData);
        // setData(newData);
        delete row.createTime;
        //加1是为了可以连续两次编辑同一条
        editDispatch([{ ...row }, editingKey + 1]);

        setEditingKey("");
      } else {
        newData.push(row);
        // setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  //监听编辑（编辑后更新）
  useEffect(() => {
    pageDispatch({
      ...inputData,
      pageNum: pagelist.page,
    });
  }, [pagelist.flag]);
  //监听删除（删除后更新）
  useEffect(() => {
    pageDispatch({
      ...inputData,
      pageNum: pagelist.page,
    });
  }, [pagelist.delflag]);

  //编辑和删除
  const showAction = (_, record) => {
    //record是这一页的数据
    const editable = isEditing(record);
    return editable ? (
      <div style={{ display: "flex", width: "180px", flexDirection: "row" }}>
        <a
          // href="javascript:;"
          href="#/lost/index/record"
          onClick={() => save(record.key)}
          style={{
            marginRight: 8,
          }}
        >
          保存
        </a>
        <a
          href="#/lost/index/record"
          onClick={() => {
            cancel();
          }}
        >
          取消
        </a>
      </div>
    ) : (
      // <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button
          style={{ marginRight: 5 }}
          disabled={editingKey !== ""}
          onClick={() => edit(record)}
        >
          编辑
        </Button>
        {/* <Button type="primary" danger onClick={() => handleDel(record)}>
          删除
        </Button> */}
        <Popconfirm
          title="确定删除?"
          cancelText="取消"
          okText="确定"
          onConfirm={() => handleDel(record)}
        >
          <Button type="primary" danger>
            删除
          </Button>
        </Popconfirm>
      </div>
      // </>
    );
  };

  //状态渲染
  const showStatus = (_, record) => {
    //判断状态
    if (record.status === "已找回") {
      return (
        <div>
          <Badge status="success" text="已找回" />
        </div>
      );
    } else if (record.status === "异常") {
      return (
        <div>
          {" "}
          <Badge status="default" text="异常" />
        </div>
      );
    } else if (record.status === "未找回") {
      return (
        <div>
          <Badge status="error" text="未找回" />
        </div>
      );
    }
  };
  //自定义筛选
  const [formLostFilter] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [formCollageFilter]=Form.useForm();
  //筛选框内容
  const [btnStatus, setbtnStatus] = useState(false);
  const [resetStatus, setresetStatus] = useState(false);
  const [isShowFilter, setisShowFilter] = useState(false);
  //是否显示
  const handleVisible = (visible) => {
    setisShowFilter(visible);
  };
  const onChange = (e) => {
    setbtnStatus(true);
    setresetStatus(true);
  };
  //监听按钮选中状态改变
  //1、按钮状态 2、重置按钮状态

  const filterSubmit = (values) => {
    let options = values.checkboxgroup;
    let temp = {};

    for (var keya in inputData) {
      if (inputData.hasOwnProperty(keya) === true) {
        temp[keya] = inputData[keya];
      }
    }
    temp.lostName = options;
    setInputData(temp);
    setisShowFilter(false);
    selectedRowsDispatch([]);
    selectedRowKeysDispatch(null);
  };

  const lostFilterSubmit = (values) => {
    let options = values.checkgroup;
    let temp = {};

    //status: "已找回", lostName: "其他"???????Object的副作用？？？
    for (var keyb in inputData) {
      if (inputData.hasOwnProperty(keyb) === true) {
        temp[keyb] = inputData[keyb];
      }
    }
    temp.status = options;
    setInputData(temp);
    setisShowLost(false);
    selectedRowKeysDispatch(null);
    selectedRowsDispatch([]);
  };
  const collageFilterSubmit=(values)=>{
    console.log("inputData",inputData);
    let options = values.checkCollage;
    let temp = {};
    for (var keyb in inputData) {
      if (inputData.hasOwnProperty(keyb) === true) {
        temp[keyb] = inputData[keyb];
      }
    }
    temp.stuCollege = options;
    setInputData(temp);
    setisShowCollage(false)
    selectedRowKeysDispatch(null);
    selectedRowsDispatch([]);
  }

  //重置
  const handleReset = () => {
    setisShowFilter(false);
    formFilter.resetFields();
    setresetStatus(false);
    // let obj = Object
    let obj = {};
    obj = inputData;
    delete obj.lostName;
    setInputData(obj);
  };
  const handleLostReset = () => {
    setisShowLost(false);
    setLostStatus(false);
    formLostFilter.resetFields();
    // let obj = Object
    let obj = {};
    obj = inputData;
    console.log("obj",obj);
    delete obj.status;
    setInputData(obj);
    // changeInputData(obj)
  };
  const handleCollageReset =()=>{
   setisShowCollage(false);
   setCollageStatus(false)
   formCollageFilter.resetFields();
   let obj = {};
    obj = inputData;
    console.log("obj",obj);
    delete obj.stuCollege;
    setInputData(obj);
  }

  //渲染失物筛选
  const handleFilter = () => {
    return (
      <Form form={formFilter} onFinish={filterSubmit}>
        <Form.Item name="checkboxgroup">
          <Radio.Group>
            {/* <Col span={8}> */}
            <Row span={8}>
              <Radio
                onChange={onChange}
                value="一卡通"
                style={{
                  lineHeight: "32px",
                  marginLeft: "15px",
                }}
              >
                一卡通
              </Radio>
            </Row>
            {/* </Col> */}
            {/* <Col span={8}> */}
            <Row span={8}>
              <Radio
                onChange={onChange}
                value="其他"
                style={{
                  lineHeight: "32px",
                  marginLeft: "15px",
                  marginBottom: "-15px",
                }}
              >
                其他
              </Radio>
            </Row>
            {/* </Col> */}
          </Radio.Group>
        </Form.Item>
        <Divider></Divider>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              style={{ position: "relative", top: "-18px" }}
              disabled={!resetStatus}
              type="link"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              style={{ position: "relative", top: "-15px" }}
              size="small"
              type="primary"
              htmlType="submit"
            >
              OK
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  };

  //失物状态筛选

  const [resetLostStatus, setLostStatus] = useState(false);
  const lostChange = (values) => {
    if (values) {
      setLostStatus(true);
    }
  };

  const getLostVisible = (visible) => {
    if (visible == true) {
      setisShowLost(true);
    } else {
      setisShowLost(false);
    }
  };
  // const formChange = (changedValues, allValues)=>{
  //   console.log("changedValues",changedValues);
  //   console.log("allValues",allValues);
  //   if(!allValues){
  //     setLostStatus(false)
  //   }else{
  //     setLostStatus(true)
  //   }
  // }
  const lostRender = () => {
    return (
      <Form
        form={formLostFilter}
        // initialValues={{'checkgroup':['未找回','已找回']}}
        // onValuesChange={formChange}
        onFinish={lostFilterSubmit}
      >
        <Form.Item name="checkgroup">
          <Radio.Group>
            <Row span={8}>
              <Radio
                onChange={lostChange}
                value="未找回"
                style={{
                  lineHeight: "32px",
                  marginLeft: "15px",
                }}
              >
                未找回
              </Radio>
            </Row>
            <Row span={8}>
              <Radio
                onChange={lostChange}
                value="已找回"
                style={{
                  lineHeight: "32px",
                  marginLeft: "15px",
                  marginBottom: "-15px",
                }}
              >
                已找回
              </Radio>
            </Row>
            <Row span={8}>
              <Radio
                onChange={lostChange}
                value="异常"
                style={{
                  lineHeight: "32px",
                  marginLeft: "15px",
                  marginBottom: "-15px",
                  marginTop: "15px",
                }}
              >
                异常
              </Radio>
            </Row>
            {/* </Col> */}
          </Radio.Group>
        </Form.Item>
        <Divider></Divider>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              style={{ position: "relative", top: "-18px" }}
              disabled={!resetLostStatus}
              type="link"
              onClick={handleLostReset}
            >
              Reset
            </Button>
            <Button
              style={{ position: "relative", top: "-15px" }}
              size="small"
              type="primary"
              htmlType="submit"
            >
              OK
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  };

  const [isShowLost, setisShowLost] = useState(false);

  //学院渲染
    const collegeRender=()=>{
      return (
        <Form
        className='college_form'
         form={formCollageFilter}
         onFinish={collageFilterSubmit}
        >
          <Form.Item name='checkCollage' >
            <Radio.Group>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="软件"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                  }}
                >
                  软件
                </Radio>
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="国际"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                  }}
                >
                  国际
                </Radio>
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="自动化"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  自动化
                </Radio>
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="传媒"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  传媒
                </Radio>
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="体育"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  体育
                </Radio>
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="先进"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  先进
                </Radio>
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="经管"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  经管
                </Radio>
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="理"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  理
                </Radio>
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="通信"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  通信
                </Radio>
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="外国语"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  外国语
                </Radio>
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="计算机"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  计算机
                </Radio>
                
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="安法"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  安法
                </Radio>
                
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="光电"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  光电
                </Radio>
                
                
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="生信"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  生信
                </Radio>
                
                
              </Row>
              <Row span={8}>
                <Radio
                  onChange={collageChange}
                  value="马克思"
                  style={{
                    lineHeight: "32px",
                    marginLeft: "15px",
                    marginBottom: "-15px",
                    marginTop: "15px",
                  }}
                >
                  马克思
                </Radio>
                            
              </Row>
              
              {/* </Col> */}
            </Radio.Group>
          </Form.Item>
          <Divider></Divider>
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                style={{ position: "relative", top: "-18px" }}
                disabled={!resetCollageStatus}
                type="link"
                onClick={handleCollageReset}
              >
                Reset
              </Button>
              <Button
                style={{ position: "relative", top: "-15px" }}
                size="small"
                type="primary"
                htmlType="submit"
              >
                OK
              </Button>
            </div>
          </Form.Item>
        </Form>
      );
    }
    const [isShowCollage, setisShowCollage] = useState(false);
    const [resetCollageStatus, setCollageStatus] = useState(false);
    const collageChange = (values) => {
      if (values) {
        setCollageStatus(true);
      }
    };
    const getCollegeVisible = (visible) => {
      if (visible == true) {
        setisShowCollage(true);
      } else {
        setisShowCollage(false);
      }
    };
  
  //测试用例
  const columns = [
    {
      title: "编号",
      dataIndex: "lkey",
      editable: true,
    },
    {
      title: "日期",
      dataIndex: "createTime",
      editable: true,
      filterIcon: () => <DownOutlined />,
      ...getColumnSearchProps("createTime"),
    },
    {
      title: "失物",
      dataIndex: "lostName",
      key: "lostName",
      editable: true,
      filterIcon: () => <DownOutlined />,
      filters: [
        { text: "一卡通", value: "一卡通" },
        { text: "其他", value: "其他" },
      ],
      filterDropdown: handleFilter,
      filterDropdownVisible: isShowFilter,
      onFilterDropdownVisibleChange: handleVisible,
    },
    {
      title: "姓名",
      dataIndex: "stuName",
      editable: true,
    },
    {
      title: "学号",
      editable: true,
      dataIndex: "stuId",
    },
    {
      title: "状态",
      editable: true,
      dataIndex: "status",
      key: "status",
      filterIcon: () => <DownOutlined />,
      filters: [
        { text: "未找回", value: "未找回" },
        { text: "已找回", value: "已找回" },
        { text: "异常", value: "异常" },
      ],
      filterDropdown: lostRender,
      filterDropdownVisible: isShowLost,
      onFilterDropdownVisibleChange: getLostVisible,
      //只能是一卡通和其他这两个字段这里才能成功运行
      // onFilter: (value, record) => record.status.includes(value),
      render: showStatus,
    },
    {
      title:'学院',
      editable: true,
      dataIndex: "stuCollege",
      key:"stuCollege",
      filterIcon: () => <DownOutlined />,     
      filterDropdown:collegeRender,
      filterDropdownVisible:isShowCollage ,
      onFilterDropdownVisibleChange:setisShowCollage
    },
    {
      title: "找回日期",
      dataIndex: "foundTime",
      editable: true,
      filterIcon: () => <DownOutlined />,
      // ...getColumnSearchProps("foundTime"),
    },
    {
      title: "领取地址",
      editable: true,

      dataIndex: "takeLocation",
    },
    {
      title: "操作",
      dataIndex: "action",
      render: showAction,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        // inputType: col.dataIndex === 'age' ? 'number' : 'text',
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const [showAni, setAni] = useState(false);
  //数组去重函数
  const unique = (arr) => {
    return Array.from(new Set(arr));
  };
  //加载中
  const [loadingStatus, setLoading] = useState("false");
  // const [selected,setSelected] = useState('false')
  //需要增加判断有没有选中
  useEffect(() => {
    pageDispatch({
      ...inputData,
      pageNum: pagelist.page,
    });
  }, [pagelist.page]);

  //路由跳转清空筛选条件
  useEffect(() => {
    return () => {
      console.log("跳转");
      setInputData(null);
      props.selectedRowKeysDispatch(null);
      props.selectedRowsDispatch([]);
    };
  }, []);

  //监听总条数变化
  //应该判断总条数/10是否大于当前页码
  useEffect(() => {
    if (pagelist.totalPage / 10 < pagelist.page) {
      var temp = Math.ceil(pagelist.totalPage / 10) || 1;
      pageChange(temp);
    }
  }, [pagelist.totalPage]);
  //监听筛选内容的改变

  useEffect(() => {
    var temp = pagelist.page;
   
    pageDispatch({
      ...inputData,
      pageNum: temp,
    });
    console.log("inputData",inputData);
  }, [inputData]);

  //每一行的配置selectedRowKeysDispatch
  const handleSelect = (record, selected, selectedRows, nativeEvent) => {
    let stateRows = _selectedRows;
    let stateKeys = selectedRowKeys;
    if (!selected) {
      stateRows = stateRows.filter((item) => {
        return item.key != record.key;
      });
      stateKeys = stateKeys.filter((item) => {
        return item != record.key;
      });
      selectedRowsDispatch(stateRows);
      props.selectedRowKeysDispatch(stateKeys);
    } else {
      let arrRows = [],
        arrKeys = [],
        _arrRows = [],
        _arrKeys = [];
      arrRows.push(record);
      if (selectedRowKeys) {
        arrKeys.splice(arrKeys.length, 0, ...selectedRowKeys);
      }

      arrRows = arrRows.concat(_selectedRows);
      arrKeys = arrKeys.concat(record.key);

      _arrRows = unique(arrRows);
      _arrKeys = unique(arrKeys);
      props.selectedRowKeysDispatch(arrKeys);
      selectedRowsDispatch(arrRows);
    }
    props.selectFlageDispatch(Math.random());
  };
  // const [selectedRowKeys, setRowKeys] = useState([]);
  const handleSelectAll = (selected, selectedRows, changeRows) => {
    let mySelectRows = selectedRows;
    if (selected) {
      //全选 unique去重
      var arrRows = unique(mySelectRows.concat(changeRows));
      var arrKeys = arrRows.map((item, index) => {
        return item.key;
      });
      props.selectedRowKeysDispatch(arrKeys);
      selectedRowsDispatch(arrRows);
      //生成随机数监听选中改变
      props.selectFlageDispatch(Math.random());
      // exportList(selectedRows);
    } else {
      //全不选
      let { _selectedRows } = props;
      _selectedRows = _selectedRows.filter((item) => {
        let arrlist = changeRows.map((v) => v.key);
        return !arrlist.includes(item.key);
      });
      var Keys = _selectedRows.map((item, index) => {
        return item.key;
      });
      selectedRowsDispatch(_selectedRows);
      props.selectedRowKeysDispatch(Keys);
      props.selectFlageDispatch(Math.random());
      // exportList(selectedRows);
    }
  };
  const onClose = () => {
    setAni(false);
    setVisible(false);
    handleSelectAll(false, "", props._selectedRows);
    // setRowKeys([]);
    // props.selectedRowKeysDispatch([])
  };
  useEffect(() => {
    // props.selectedRowKeysDispatch(selectedRowKeys)
    if (_selectedRows.length >= 2) {
      setAni(true);
    } else {
      setAni(false);
    }
    // setRowKeys(props.selectedRowKeys);
  }, [pagelist.selectFlage]);
  const rowSelection = {
    type: "checkbox",
    columnWidth: "44px",
    selectedRowKeys,
    onSelect: handleSelect,
    onSelectAll: handleSelectAll,
  };

  //翻页重构
  const pageChange = (current) => {
    pageChangeDispatch(current);
  };

  // 底部批量删除
  const [visible, setVisible] = useState(false);

  const delLists = () => {
    props.selectFlageDispatch(Math.random());
    let arr = [];
    // props.selectedRowsDispatch(selectedRows),
    props.selectedRowKeysDispatch(null);
    
    delsDispatch({
      list: selectedRowKeys,
    });
  };

  const handleClose = () => {
    var c = document.getElementById("canvas_other");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    changeCanvas(false);
  };

  const handleClose_card = () => {
    var c = document.getElementById("canvas_card");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    props.changeCanvas_card(false);
  };
  //底部批量修改状态
  const editList=()=>{
    props.selectFlageDispatch(Math.random());
    props.selectedRowKeysDispatch(null);
    editsDispatch(
      {
        list:selectedRowKeys
      }
    )
  }

  //判断登录是否过去弹窗
  // const history = useHistory();
  const navigate = useNavigate()
  useEffect(() => {
    // Info()
    if (member.loginFlag) {
      memberDispatch.changeloginFlag(false);
      memberDispatch.changethevisibal(false);
      // history.push("/")
      // console.log(history.push);
      navigate("/");
    }
  }, [member.loginFlag]);
  const Jumpmessage = () => {
    const handleCancel = () => {
      memberDispatch.changethevisibal(false);
      message.info("已取消");
    };

    return (
      <Modal
        visible={member.thevisibal}
        title="提示信息"
        okText="确定"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={() => {
          memberDispatch.changeloginFlag(true);
        }}
      >
        <p>登录已过期，请重新登录</p>
        {/* <div>点击确定可以跳转到登录页面</div> */}
      </Modal>
    );
  };
  console.log("pagelist.list",pagelist.list);
  return (
    // <Content>
    <div className={style.Container}>
      <Form form={form} component={false}>
        <Table
          loading={loadingStatus}
          bordered
          rowClassName={style.tablerow}
          rowKey={(record) => record.key}
          // rowClassName={style.editablerow}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowSelection={{
            // type: selectionType,
            ...rowSelection,
          }}
          pagination={false}
          columns={mergedColumns}
          dataSource={pagelist.list}
        />
        <Pagination
          className={style.Pagination}
          defaultCurrent={1}
          current={props.pagelist.page}
          // current={1}
          showSizeChanger={false}
          total={pagelist.totalPage}
          // total={50}
          onChange={(current) => {
            pageChange(current);
          }}
        />
        {/* 自定义动画  const [showAni,setAni] = useState(false) */}
        <div className={showAni ? style.active : style.animate}>
          <Button onClick={editList}>批量修改状态</Button>
          <Button onClick={delLists}>批量删除</Button>
          <span>
            已选择{selectedRowKeys == null ? "0" : selectedRowKeys.length}条记录
          </span>
          <Button onClick={onClose} className={style.cancel} type="link">
            <CloseOutlined />
          </Button>
        </div>
      </Form>
      {/* 一键导出功能 */}

      <div
        // className={style.canvasContainer}
        id="node_other"
        className={pagelist.showCanvas ? style.canvasContainer : style.none}
        align="center"
      >
        <CloseOutlined onClick={handleClose} className={style.closeIcon} />
        <canvas
          id="canvas_other"
          width="700"
          height="900"
          className={style.canvas}
        ></canvas>
      </div>
      <div
        // className={style.canvasContainer}
        id="node_card"
        className={
          pagelist.showCanvas_card ? style.canvasContainer : style.none
        }
        align="center"
      >
        <CloseOutlined onClick={handleClose_card} className={style.closeIcon} />
        <canvas
          id="canvas_card"
          width="700"
          height="900"
          className={style.canvas}
        ></canvas>
      </div>
      <Jumpmessage></Jumpmessage>
    </div>
    //{/* </Content> */}
  );
};

const mapState = (state) => ({
  pagelist: state.manageLose,
  member: state.manageLose,
  selectedRowKeys: state.manageLose.selectedRowKeys,
  _selectedRows: state.manageLose.selectedRows,
  inputData: state.manageLose.inputData,
});

const mapDispatch = (dispatch) => ({
  inputChangeDispatch: dispatch.manageLose.setInputValue,
  pageDispatch: dispatch.manageLose.submitInput,
  editDispatch: dispatch.manageLose.EditInput,
  delDispatch: dispatch.manageLose.delItem,
  delsDispatch: dispatch.manageLose.delItems,
  pageChangeDispatch: dispatch.manageLose.pageChange,
  success: dispatch.manageLose.success,
  exportList: dispatch.manageLose.setExportLists,
  changeCanvas: dispatch.manageLose.changeShowCanvas,
  changeCanvas_card: dispatch.manageLose.changeShowCanvas_card,
  memberDispatch: dispatch.manageLose,
  selectedRowKeysDispatch: dispatch.manageLose.getSelectedRowKeys,
  selectedRowsDispatch: dispatch.manageLose.getSelectedRows,
  selectFlageDispatch: dispatch.manageLose.selectSuccess,
  setInputData: dispatch.manageLose.setInputData,
  changeInputData: dispatch.manageLose.changeInputData,
  editsDispatch:dispatch.manageLose.editsData
});

const TableList = connect(mapState, mapDispatch)(Tables);

export default TableList;
