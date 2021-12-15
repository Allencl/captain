import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'

import { Layout, Menu, } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';


import HomeRouter from './Home';   
import CsvToJsonRouter from './view/CsvToJson.jsx';



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Page extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (<Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{background:"#fff"}} collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Menu theme="light" mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to="/">{"首页"} </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                <Link to="/csvToJson">{"csv -> Json"}</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Routes>
                <Route exact path="/" element={<HomeRouter />}/>
                <Route exact path="/csvToJson" element={<CsvToJsonRouter />}/>

            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>);
  }
}

export default Page; 
