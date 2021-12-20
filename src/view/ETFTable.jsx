import React from 'react';
import {message,Row,Col,Table,Tag} from 'antd';
import {globalGetLocalFile} from 'utils';
import {BarChartOutlined,RiseOutlined,FallOutlined} from '@ant-design/icons';

import tableJSON from 'dataLocal/ETFTable.json';



class Page extends React.Component {
    state = {
        data:[],
        columns:[
            {
              title: '名称',
              dataIndex: 'name',
              width: 160,
            },
            {
              title: '网址',
              dataIndex: 'web',

            },
            {
              title: 'Address',
              dataIndex: 'address',
    
            },
        ]
    };

    componentDidMount(){
        this.initFunc();
    }

    initFunc=()=>{
        this.setState({
            data:tableJSON
        });        
    }

 
    render(){
        let {columns,data}=this.state;

        return (<div>
            <Table
                columns={columns}
                dataSource={data}
                size={"small"}

            />    
   
        </div>);
    }
}


export default Page;
