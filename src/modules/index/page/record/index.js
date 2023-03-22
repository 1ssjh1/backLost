//失物记录界面
import React, { useState } from "react";
import { useLocation, useNavigate, withRouter } from "react-router";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import { PageHeader, Button, Input, message, Tabs } from "antd";
import TableList from "./tableList";
import PicData from "./picdata";
import style from "./index.module.less";
const { Search } = Input;
const LostRecord = (props) => {
  // const history = useHistory();
  const navigate = useNavigate()
  const { selectItem, setSelectItem } = props;
  const location = useLocation()
  const locations = location.pathname.split('/')
  // console.log('aa',location.pathname);
  let hisroute = `/${locations[2]}/${locations[3]}`;
  // console.log(hisroute);
  //头顶部分
  const TopContent = (props) => {
    //用来后面判断在那个页面并加粗；

    // const hitory = useHistory();
    const navigate = useNavigate()
    //跳转新增失物,需要改变边侧栏状态

    const handleToadd = () => {
      setSelectItem("add");
      // hitory.push("/index/add");
      navigate('/lost/index/add')
    };

    //一键导出
    //测试数据头部字段

    // const topdata = ["编号", "失物名称", "失物姓名","学院","领取地址"];
    const topdata = {
      key1: "编号",
      key2: "姓名",
      key3: "学号",
      key4: "学院",
      key5: "认领地点",
    };

    const otherTopdata = {
      key1: "编号",
      key2: "失物名称",
      key3: "失物具体信息",
      key4: "认领地点",
    };
    //导出函数
    //选择的数据还要进行处理 props.list
    //要么选一卡通要么选其他
    const hanldeExport = () => {
      let { list } = props;
      if (list.length == 0) {
        message.error("请先勾选导出项");
        return;
      }
      //标识是否既有一卡通也有其他失物
      let a = false,
        b = false;
      for (let i = 0; i < list.length; i++) {
        if (list[i].lostName.includes("一卡通")) {
          a = true;
          continue;
        }
      }
      for (let i = 0; i < list.length; i++) {
        if (!list[i].lostName.includes("一卡通")) {
          //其他失物

          b = true;
          continue;
        }
      }

      if (a && b) {
        message.error("一卡通不能和其他失物一起导出~");
        return;
      }
      if (props.list.length > 10) {
        message.error("目前一次性最多只能导出10条~");
        return;
      }

      if (a) {
        // exportCard(list);

        exportCard(list, "一卡通");

        //测试不用list
        // exportOthers('一卡通')
      } else {
        for (var i = 0; i < list.length; i++) {
          if (list[i].lostDescription === null) {
            message.error("失物描述不能为空");
            return;
          }
        }
        exportOthers(list, "其他失物");
        // exportOthers("其他失物");
      }
    };
    //导出一卡通
    //学院减少两个字的宽  编号增加两个字宽度  认领地点增加两个字宽度
    const exportCard = (list, type) => {
      var exportType = type;
      props.dispatch.changeShowCanvas_card(true);
      var arr = getArr(exportType, list);
      var img = new Image();
      img.src = "https://we.cqupt.edu.cn/app/images/core/swzl/img_lose.png";
      // img.src = otherlose
      var canvas = document.getElementById("canvas_card");
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      var rows = arr.length;
      let y_distance = list_center(rows),
        x_distance = 70; //初始距离左侧距离
      let wides_card = new Array();
      let height = 40;
      let _y_distance;
      //每个格子初始宽度
      wides_card = [80, 120, 120, 100, 140];
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        ctx.textAlign = "center";
        ctx.font = "15px Arial";

        for (var i = 0; i < arr.length; i++) {
          //换行
          Object.keys(arr[i]).forEach((item, index) => {
            //每一行
            ctx.rect(x_distance, y_distance, wides_card[index], height);
            _y_distance = y_distance + height / 2 + 7;
            ctx.fillText(
              arr[i][item],
              x_distance + wides_card[index] / 2,
              _y_distance
            );
            x_distance += wides_card[index];
          });
          x_distance = 70;
          y_distance += height;
        }
        ctx.stroke();
      };
    };
    //导出其他失物
    //这里不用再判断类型了
    const exportOthers = (list, type) => {
      var exportType = type;
      props.dispatch.changeShowCanvas(true);
      var arr = getArr(exportType, list);
      var img = new Image();
      img.src = "https://we.cqupt.edu.cn/app/images/core/swzl/other_lose.png";
      var canvas = document.getElementById("canvas_other");
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      let rows = getRows(arr);
      let y_distance = list_center(rows),
        x_distance = 75;
      let wides_other = new Array();
      let height = 35;
      let temp = 1;
      let _y_distance;
      //总宽 550
      wides_other = [105, 115, 190, 150];

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        // if (exportType === "其他失物") {
        for (var i = 0; i < arr.length; i++) {
          Object.keys(arr[i]).forEach((item, index) => {
            if (i > 0) {
              //temp表示原本一行的高度伸长到了temp行
              temp = Math.ceil(arr[i].lostDescription.length / 18);
              item == "lostDescription"
                ? (_y_distance = y_distance + height / 2 + 7)
                : (_y_distance = y_distance + (height * temp) / 2 + 7);
              ctx.rect(
                x_distance,
                y_distance,
                wides_other[index],
                height * temp
              );
              draw_long_text(
                arr[i][item],
                ctx,
                x_distance + wides_other[index] / 2,
                //估计是边框的原因y轴没有完全居中
                _y_distance
              );
              x_distance += wides_other[index];
            } else {
              ctx.rect(
                x_distance,
                y_distance,
                wides_other[index],
                height * temp
              );
              item == "lostDescription"
                ? (_y_distance = y_distance + height / 2 + 7)
                : (_y_distance = y_distance + (height * temp) / 2 + 7);
              draw_long_text(
                arr[i][item],
                ctx,
                x_distance + wides_other[index] / 2,
                _y_distance
              );
              x_distance += wides_other[index];
            }
          });
          x_distance = 75;
          y_distance += height * temp;
        }
        ctx.stroke();
      };
    };
    //获取列表数据占多少行
    const getRows = (list) => {
      var rows = 0;
      for (var i = 1; i < list.length; i++) {
        //第一行是表头，所以从第二行开始处理
        rows += Math.ceil(list[i].lkey.length / 11);
      }
      return rows + 1;
    };
    //获取处理过后的数据
    const getArr = (type, list) => {
      var arr = new Array();
      arr.length = list.length;
      //为领取地点配置权重
      for(let item of list){
        item.weight = getWeight(item.takeLocation) 
      }
      //根据权重排序
      list.sort((left,right)=>{
        return  right.weight-left.weight
      })
      if (type === "一卡通") {
        for (var u = 0; u < arr.length; u++) {
          arr[u] = {
            lkey: "",
            stuName: "",
            stuId: "",
            stuCollege: "",
            takeLocation: "",
          };
        }
        for (var g = 0; g < arr.length; g++) {
          arr[g].lkey = list[g].lkey;
          arr[g].stuName = list[g].stuName;
          arr[g].stuId = list[g].stuId;
          arr[g].stuCollege = list[g].stuCollege;
          arr[g].takeLocation = list[g].takeLocation;
        }

        arr.splice(0, 0, topdata);
      } else if (type === "其他失物") {
        for (var u = 0; u < arr.length; u++) {
          arr[u] = {
            lkey: "",
            lostName: "",
            lostDescription: "",
            takeLocation: "",
          };
        }
        for (var g = 0; g < arr.length; g++) {
          arr[g].lkey = list[g].lkey;
          arr[g].lostName = list[g].lostName;
          arr[g].lostDescription = list[g].lostDescription;
          arr[g].takeLocation = list[g].takeLocation;
        }
        arr.splice(0, 0, otherTopdata);
      }

      return arr;
    };
    //获取权重
    //排序    二三四五八教  经管老图数图  风华千喜鹤延生中心食堂 兴业苑莘莘 樱花 二维码楼
    const getWeight = (takeLocation)=>{
      if(takeLocation.includes('二教'))return 17
      if(takeLocation.includes('三教'))return 16
      if(takeLocation.includes('四教'))return 15
      if(takeLocation.includes('五教'))return 14
      if(takeLocation.includes('八教'))return 13
      if(takeLocation.includes('经管'))return 12
      if(takeLocation.includes('老图'))return 11
      if(takeLocation.includes('数图'))return 10
      if(takeLocation.includes('风华'))return 9
      if(takeLocation.includes('千喜鹤'))return 8
      if(takeLocation.includes('延生'))return 7
      if(takeLocation.includes('中心食'))return 6
      if(takeLocation.includes('兴业苑'))return 5
      if(takeLocation.includes('莘莘'))return 4
      if(takeLocation.includes('樱花'))return 3
      if(takeLocation.includes('二维码'))return 2
      if(takeLocation.includes('勤工助学'))return 1
      return 0
    }
    //列表居中
    const list_center = (rows) => {
      return config.get(rows) || [];
    };
    //约定 不同行数距离顶部数值
    const config = new Map()
      .set(11, 235)
      .set(10, 255)
      .set(9, 275)
      .set(8, 295)
      .set(7, 315)
      .set(6, 335)
      .set(5, 355)
      .set(4, 375)
      .set(3, 395)
      .set(2, 415);
    //自动换行
    //哪些情况需要把（附图）单独拿出来换行
    //1.只要字段长度超过一行 都要把（附图）拿出来单独放一行
    const draw_long_text = (longtext, cxt, begin_width, begin_height) => {
      var linelenght = 20;
      var text = ""; //每一行的字段
      var count = 0;
      var begin_width = begin_width;
      var begin_height = begin_height;
      var stringLength = longtext.length;
      var newtext = longtext.split("");
      var context = cxt;
      // context.clearRect(0, 0, 600, 300);
      // context.textAlign = "left";
      context.textAlign = "center";
      context.font = "15px Arial";
      for (var i = 0; i <= stringLength; i++) {
        if (newtext[0] === "（" && stringLength > 18 && newtext[1] === "附") {
          if (text.length > 14) {
            //（附图）占了四个字符
            context.fillText(text, begin_width, begin_height);
            begin_height = begin_height + 35;
            text = "";
            count = 0;
          }
        }
        if (count == 18) {
          //字符长度超过11 换行
          context.fillText(text, begin_width, begin_height);
          begin_height = begin_height + 35;
          text = ""; //重置
          count = 0;
        }
        if (i == stringLength) {
          context.fillText(text, begin_width, begin_height);
        }
        var text = text + newtext[0];
        count++;
        newtext.shift();
      }
    };
    const handleBack = () => {
      window.history.back();
    };
    const { setInputData, inputData } = props;
    const changeStatusF = () => {
      props.dispatch.changeShow(false);
    };
    const changeStatusT = () => {
      props.dispatch.changeShow(true);
    };
    const onSearch = (value) => {
      var temp = {};
      // 不应该清空输入内容，应该让用户察觉输入了什么
      // Number(value)不会改变value的类型
      var num = Number(value);
      if (!isNaN(num)) {
        for (var keyd in inputData) {
          if (inputData.hasOwnProperty(keyd) === true) {
            temp[keyd] = inputData[keyd];
          }
        }
        if (temp.hasOwnProperty("stuName") === true) {
          delete temp.stuName;
        }
        temp.stuId = value;
        setInputData(temp);
      } else if (value === "") {
        //清空名字或者学号
        let obj = {};
        obj = inputData;
        if (inputData.stuName) {
          delete obj.stuName;
        } else if (inputData.stuId) {
          delete obj.stuId;
        }
        setInputData(obj);
        // obj = inputData

        // props.dispatch.submitInput({
        //   pageNum:props.page
        // })
      } else if (typeof value === "string") {
        for (var keye in inputData) {
          if (inputData.hasOwnProperty(keye) === true) {
            temp[keye] = inputData[keye];
          }
        }
        if (temp.hasOwnProperty("stuId") === true) {
          delete temp.stuId;
        }
        temp.stuName = value;
        setInputData(temp);
      } else {
        message.error("请输入学号或者姓名");
      }
    };
    function callback(key) {}
    if (hisroute == "/index/record") hisroute = "/index/record/showList";
    return (
      <div className={style.Container}>
        <PageHeader
          className={style.site}
          extra={[
            <Link
              key="1"
              onClick={changeStatusT}
              className={
                hisroute === "/index/record/showList"
                  ? style.present_Input
                  : style.Input
              }
              to="/lost/index/record/showList"
            >
              列表显示
            </Link>,
            <Link
              key="2"
              onClick={changeStatusF}
              className={
                hisroute === "/index/record/showPic"
                  ? style.present_Input
                  : style.Input
              }
              to="/lost/index/record/showPic"
            >
              图表数据
            </Link>,
            <div key="4" className={props.state ? style.Show : style.noShow}>
              <Search
                allowClear
                placeholder="输入学号或姓名快捷搜索"
                onSearch={onSearch}
                enterButton
                className={style.Input}
              />
              <Button onClick={handleToadd} className={style.Input}>
                新增失物
              </Button>
              <Button onClick={hanldeExport}>一键导出</Button>
            </div>,
          ]}
          // subTitle="This is a subtitle"
        ></PageHeader>
      </div>
    );
  };

  return (
    <div className={style.record}>
      <TopContent
        dispatch={props.pageDispatch}
        list={props.exportLists}
        state={props.isShow}
        selectItem={props.selectItem}
        setSelectItem={props.setSelectItem}
        page={props.page}
        setInputData={props.setInputData}
        inputData={props.inputData}
      />
      <div>
        {/* <Router>  */}
        <Routes>
          <Route path="/" exact component={TableList} />
          <Route path="showList" component={TableList} />
          <Route path="showPic" component={PicData} />
        </Routes>
        {/* </Router> */}
      </div>
    </div>
  );
};

const mapState = (state) => ({
  // approveList = state.userController
  showCanvas: state.manageLose.showCanvas,
  isShow: state.manageLose.isShow,
  // exportLists: state.manageLose.exportLists,
  exportLists: state.manageLose.selectedRows,
  page: state.manageLose.page,
  selectItem: state.common.selectItem,
  inputData: state.manageLose.inputData,
});

const mapDispatch = (dispatch) => ({
  userControllerDispatch: dispatch.userController,
  pageDispatch: dispatch.manageLose,
  setSelectItem: dispatch.common.setSelectItem,
  setInputData: dispatch.manageLose.setInputData,
  // inputDispatch:dispatch.manageLose.setInputValue
});

const Record = connect(mapState, mapDispatch)(LostRecord);
export default Record;
