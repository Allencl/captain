import React from 'react';
import {message,Button,Input,Tag} from 'antd';
import {AliyunOutlined} from '@ant-design/icons';

import {asyncFormatCSVToJSON,globalLoadingUpdate} from 'utils';

const { TextArea } = Input;

class Page extends React.Component {
    state = {
        visible:false,
        loading: false,
        jsonString:'',
        JSONSource:[]
    };

    // csv to json
    changeHandle=(event)=>{
        let file = event.target.files[0];


        if( !file ){
            message.warning('文件格式不存在！');
            return;
        }

        if( !file['type'].includes('excel') ){
            message.warning('文件格式不正确！[CSV]');
            return;
        }


        globalLoadingUpdate(true);
        
        this.setState({
            JSONSource:[],
            jsonString:''
        });        

        this.setState({loading:true,fileName:file['name'],dataSource:[]});
        asyncFormatCSVToJSON(file).then(o=>{


            globalLoadingUpdate(false);

            
            // updete
            this.setState({
                loading:false,
                JSONSource:o['data']
                // dataSource:newData,
            });
        });


        globalLoadingUpdate(false);


    }  


    // data -> json
    toJsonHandle=()=>{

        globalLoadingUpdate(true);


        let {JSONSource}=this.state;

        if(!JSONSource["length"]){
            message.warning('未选择文件！');
            globalLoadingUpdate(false);

            return
        }

        this.setState({
            jsonString:JSON.stringify(JSONSource)
        },()=>{
            globalLoadingUpdate(false);
        });
    }

    render(){
        let {jsonString,JSONSource}=this.state;

        return (<div>
            <div style={{height:43,marginTop:10}}>
                <input onChange={this.changeHandle} type="file" />
                {/* <Button onClick={this.toJsonHandle} style={{float:'right'}} type="primary" icon="export" size="small" >JSON</Button> */}
            </div>
            <div>
                <Button onClick={this.toJsonHandle} type="primary" icon={<AliyunOutlined />}>转JSON</Button>
                
                { JSONSource["length"] ?
                    <span>
                        <Tag style={{marginLeft:22}} color="#2db7f5">
                            {JSONSource["length"]}{" 天"}
                        </Tag>
                        <Tag style={{marginLeft:8}} color="#108ee9">
                            { ((JSONSource["length"])/31).toFixed(1)  }{" 月"}
                        </Tag>                         
                        <Tag style={{marginLeft:8}} color="#87d068">
                            { ((JSONSource["length"])/365).toFixed(1)  }{" 年"}
                        </Tag>                        
                    </span>
                    :
                    ''
                }
                
            </div>
            <div style={{marginTop:12}}>
                <TextArea rows={26} value={jsonString} />
            </div>
        </div>);
    }
}


export default Page;
