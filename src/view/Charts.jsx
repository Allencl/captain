import React from 'react';
import {message,Button,Input,Tag} from 'antd';
import * as echarts from 'echarts';
import {globalGetLocalFile} from 'utils';


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

    // csv to json
    changeHandle=(event)=>{
        let file = event.target.files[0];


        if( !file ){
            message.warning('文件格式不存在！');
            return;
        }

        if( !file['type'].includes('json') ){
            message.warning('文件格式不正确！[JSON]');
            return;
        }

        globalGetLocalFile(file).then((file)=>{
            console.log(file);
            console.log(1377);
        });


    }  


    render(){

        return (<div>
            <div style={{height:43,marginTop:10}}>
                <input onChange={this.changeHandle} type="file" />
                {/* <Button onClick={this.toJsonHandle} style={{float:'right'}} type="primary" icon="export" size="small" >JSON</Button> */}
            </div>            
            <div id='echarts' style={{width:"100%",height:600}}></div>
        </div>);
    }
}


export default Page;
