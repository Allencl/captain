import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  HomeOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import {BrowserRouter,Routes, Route,Link } from 'react-router-dom';

import HomeRoute from "./Home.jsx";
import CsvToJsonRoute from "./view/CsvToJson.jsx";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Page extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (<BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{background:"#fff"}} collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <Menu style={{height:"100%"}} defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/">{"首页"}</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<HomeOutlined />}>
                        <Link to="/CsvToJson">{"CSV->Json"}</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ padding:'0 16px',background:"#fff" }}>
                    <Routes>
                        <Route path="/" element={<HomeRoute />} />
                        <Route path="/CsvToJson" element={<CsvToJsonRoute />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    </BrowserRouter>);
  }
}


export default Page;
