import React, { Component } from "react";

import { Layout } from "antd";
import { HeaderApp, UserHeader, UserChart, HeaderChart } from "../compoents";

const { Header, Content, Sider } = Layout;

class User extends Component {
  render() {
    const { categorys, activeCategory, _toggleCategoryChart } = this.props;
    return (
      <Layout id="main-layout">
        <Header>
          <HeaderApp />
        </Header>
        <Layout>
          <Sider id="user-header" width={250} theme="light">
            <UserHeader />
          </Sider>

          <Content className="layout-item ">
            <HeaderChart
              categorys={categorys}
              activeCategory={activeCategory}
              toggleCategoryChart={_toggleCategoryChart}
            />
            <UserChart />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default User;
