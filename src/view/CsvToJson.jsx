import React from 'react';
import {Table,message,Button,Modal,Input,Tag} from 'antd';
import store from 'store';
import {asyncFormatCSVToJSON} from 'utils';



class Page extends React.Component {
    state = {
        visible:false,
        loading: false,
        dataSource:[]
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

        store.dispatch({
            type: 'update_global_spin',
            value: true
        });        

        this.setState({loading:true,fileName:file['name'],dataSource:[]});
        asyncFormatCSVToJSON(file).then(o=>{

            store.dispatch({
                type: 'update_global_spin',
                value: false
            });
            
            // updete
            this.setState({
                loading:false,
                JSONSource:o['data']
                // dataSource:newData,
            });
        });

        store.dispatch({
            type: 'update_global_spin',
            value: false
        });

    }  

  render(){
    return (<div>
        <div style={{height:43,marginTop:10}}>
            <input onChange={this.changeHandle} type="file" />
            {/* <Button onClick={this.toJsonHandle} style={{float:'right'}} type="primary" icon="export" size="small" >JSON</Button> */}
        </div>
    </div>);
  }
}


export default Page;
