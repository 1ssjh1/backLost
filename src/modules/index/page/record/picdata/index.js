import ReactEcharts from 'echarts-for-react';
import React, { useEffect } from "react";
import withRouter from '../../../../../util/useWithRouter';
import { connect } from "react-redux";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import { Button,Tooltip } from 'antd';
import style from './index.module.less'
import { link } from 'fs';
const TeamMember = (props) => {
  const { picdataDispatch, picdata } = props
  useEffect(() => {
    picdataDispatch.getPicdata();
    // console.log(picdata.echartsreact,'heiehi')
  }, []);
  const Linechart = () => {
    const option = {
      grid:{
        height:"60%",
        left:"10%",
        top:"20%",
        width:"80%"
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['丢失数量']
      },
      xAxis: {
        type: 'category',
        data: [picdata.data.seven[0], picdata.data.six[0], picdata.data.five[0],
           picdata.data.four[0], picdata.data.three[0], picdata.data.two[0], picdata.data.one[0]]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '丢失数量',
        label: {
          show: true,
          position: 'top'
        },
        data: [picdata.data.seven[1], picdata.data.six[1], picdata.data.five[1],
           picdata.data.four[1], picdata.data.three[1], picdata.data.two[1], picdata.data.one[1]],
        type: 'line'
      }]
    };
     
    const onClick= ()=>{
       console.log(picdata.echartsreact)
    }
    return (
      <>
      <Tooltip  title="右键点击可以保存图片哟！">
      <Button type="text" onClick={onClick}>导出说明</Button>
      </Tooltip>
      <ReactEcharts
        lazyUpdate={true}
        option={option}
        style={{ height: '350px', width: "80%"}}
        className='react_for_echarts' />
      </>
    );
  }
  const Rowchart = () => {
    const option = {
      title: {
        text: '找回率',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '找回率',
          type: 'pie',
          radius: '50%',
          data: [
            { value: picdata.data.found, name: '已找回' },
            { value: picdata.data.notFound, name: '未找回'},
            { value: picdata.data.abnormal, name: '异常'  },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    return (
        
      <ReactEcharts
        option={option}
        lazyUpdate={true}
        style={{ height: '300px',width: "80%",marginTop:"5%"}}
        className='react_for_echarts' />
     
    );
  }
  return (
    <div key={props.location.key} className={style.Container} style={{clear:"left"}}>
       <Linechart></Linechart>
       <Rowchart></Rowchart>
    </div>
  )
};

const mapState = (state) => ({
  picdata: state.picdata
});

const mapDispatch = (dispatch) => ({
  picdataDispatch: dispatch.picdata,
});
const PicData = connect(mapState, mapDispatch)(withRouter(TeamMember));
export default PicData;