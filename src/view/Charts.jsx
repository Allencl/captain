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
        // this.initFunc();
    }

    /**
     * 初始化
     */
    initFunc(data){
        var chartDom = document.getElementById('echarts');
        var myChart = echarts.init(chartDom);
        var option;
        let _list=["01","02","03","04","05","06","07","08","09","10","11","12"];

        option = {
          xAxis: {
            type: 'category',
            data: _list
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: _list.map(o=>data[o].length),
              type: 'bar'
            }
          ]
        };
        
        option && myChart.setOption(option);
    }


    formatFunc=(data)=>{
        let _json={
            "01":[],
            "02":[],
            "03":[],
            "04":[],
            "05":[],
            "06":[],
            "07":[],
            "08":[],
            "09":[],
            "10":[],
            "11":[],
            "12":[],
        };

        let _data=data.filter((o)=>{
            var _date=(o["<DATE>"]).split(".")[1];
            if(o["<CLOSE>"]>o["<OPEN>"]){
                _json[_date]=_json[_date].concat([
                    parseInt(o["<HIGH>"]-o["<LOW>"])
                ])
                return o;
            }
            return false;
        });

        this.initFunc(_json);

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
