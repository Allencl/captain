import React from 'react';
import {Table,message,Button,Input,Tag} from 'antd';
import * as echarts from 'echarts';


class Page extends React.Component {
    state = {

    };

    componentDidMount(){
        this.initFunc();
    }

    /**
     * 初始化
     */
    initFunc(){
        var chartDom = document.getElementById('echarts');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar'
            }
          ]
        };
        
        option && myChart.setOption(option);
    }

    render(){

        return (<div>
            <div id='echarts' style={{width:"100%",height:600}}></div>
        </div>);
    }
}


export default Page;
