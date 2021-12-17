import React from 'react';
import {message,Row,Col,Tag} from 'antd';
import * as echarts from 'echarts';
import {globalGetLocalFile} from 'utils';
import {BarChartOutlined,RiseOutlined,FallOutlined} from '@ant-design/icons';

class Page extends React.Component {
    state = {
        allNumber:0,
        upNumber:0,
        downNumber:0
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


    formatFunc=(data)=>{
        let _data=data.filter((o)=>{
            if(o["<CLOSE>"]>o["<OPEN>"]){
                return o;
            }

            return false;
        });
        console.log(_data);

        this.setState({
            allNumber:data["length"],
            upNumber:_data["length"],
            downNumber:data["length"]-_data["length"]
        });
    }

    // csv to json
    changeHandle=(event)=>{
        let that=this;
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
            that.formatFunc(JSON.parse(file));
        });
    }  


    render(){
        let {allNumber,upNumber,downNumber}=this.state;

        return (<div>
            <div style={{height:43,marginTop:10}}>
                <Row>
                    <Col span={12}>
                        <input style={{width:"100%",color:"#1890ff",fontWeight:500}} onChange={this.changeHandle} type="file" />
                    </Col>
                    <Col span={12}>
                        { allNumber ? 
                            <div style={{textAlign:"right"}}>
                                <Tag style={{marginRight:32}} icon={<BarChartOutlined />} color="#2db7f5">{String(allNumber)}</Tag>
                                <Tag style={{marginRight:9,marginLeft:3}} icon={<RiseOutlined />} color="#108ee9">{String(upNumber)}</Tag>
                                <Tag color="cyan">{(upNumber>downNumber)?"多于":"少于"}</Tag>
                                <Tag style={{marginLeft:0}} icon={<FallOutlined />} color="#108ee9">{String(downNumber)}</Tag>
                            </div>
                            :""
                        }                        
                    </Col>
                </Row>                
            </div> 
    
   
            <div id='echarts' style={{width:"100%",height:600}}></div>
        </div>);
    }
}


export default Page;
