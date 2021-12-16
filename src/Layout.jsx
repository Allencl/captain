import React from 'react';
import { Layout, Menu,Spin, Breadcrumb } from 'antd';
import store from 'store';

import {HomeOutlined,AliyunOutlined} from '@ant-design/icons';

import {BrowserRouter,Routes, Route,Link } from 'react-router-dom';

import HomeRoute from "./Home.jsx";
import CsvToJsonRoute from "./view/CsvToJson.jsx";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Page extends React.Component {

  state = {
    collapsed: false,
    spinning:false
  }

  componentDidMount(){
    let that=this;
    store.subscribe(()=>{
      let _data=store.getState();

      that.setState({
        spinning:_data.global_spin_active
      });
    })   
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed,spinning } = this.state;

    return (<BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{background:"#fff"}} collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <Menu style={{height:"100%"}} defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/">{"首页"}</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AliyunOutlined />}>
                        <Link to="/CsvToJson">{"CSV->Json"}</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{background:"#fff"}}>
                <Spin size="large" spinning={spinning}>
                  <Content style={{ padding:'0 16px',background:"#fff" }}>
                      <Routes>
                          <Route path="/" element={<HomeRoute />} />
                          <Route path="/CsvToJson" element={<CsvToJsonRoute />} />
                      </Routes>
                  </Content>
                </Spin>
            </Layout>
        </Layout>
    </BrowserRouter>);
  }
}


export default Page;
