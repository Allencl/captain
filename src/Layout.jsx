import React from 'react';
import { Layout, Menu,Spin, Breadcrumb } from 'antd';
import store from 'store';

import {TableOutlined,HomeOutlined,AliyunOutlined,LineChartOutlined} from '@ant-design/icons';

import {BrowserRouter,Routes, Route,Link } from 'react-router-dom';

import HomeRoute from "./Home.jsx";
import CsvToJsonRoute from "./view/CsvToJson.jsx";
import ChartsRoute from "./view/Charts.jsx";
import StockTableRoute from "./view/stockTable.jsx";
import ForexTableRoute from "./view/forexTable.jsx";
import ETFTableRoute from "./view/ETFTable.jsx";



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
                <Menu style={{height:"100%"}} defaultSelectedKeys={[]} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/">{"首页"}</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AliyunOutlined />}>
                        <Link to="/CsvToJson">{"CSV->Json"}</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<LineChartOutlined />}>
                        <Link to="/Charts">{"Charts"}</Link>
                    </Menu.Item>     
                    <Menu.Item key="4" icon={<TableOutlined />}>
                        <Link to="/stockTable">{"Stock"}</Link>
                    </Menu.Item>  
                    <Menu.Item key="5" icon={<TableOutlined />}>
                        <Link to="/forexTable">{"Forex"}</Link>
                    </Menu.Item> 
                    <Menu.Item key="6" icon={<TableOutlined />}>
                        <Link to="/ETFTable">{"ETF"}</Link>
                    </Menu.Item>                     
                                   
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{background:"#fff"}}>
                <Spin size="large" spinning={spinning}>
                  <Content style={{ padding:'12px 16px',background:"#fff" }}>
                      <Routes>
                          <Route path="/" element={<HomeRoute />} />
                          <Route path="/CsvToJson" element={<CsvToJsonRoute />} />
                          <Route path="/Charts" element={<ChartsRoute />} />
                          <Route path="/stockTable" element={<StockTableRoute />} />
                          <Route path="/forexTable" element={<ForexTableRoute />} />
                          <Route path="/forexTable" element={<ForexTableRoute />} />
                          <Route path="/ETFTable" element={<ETFTableRoute />} />

                          
                      </Routes>
                  </Content>
                </Spin>
            </Layout>
        </Layout>
    </BrowserRouter>);
  }
}


export default Page;
