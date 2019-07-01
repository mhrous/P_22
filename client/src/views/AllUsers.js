import React, { Component } from "react";
import { Layout } from "antd";
import { HeaderApp, UserRomeContainers } from "../compoents";

const { Header, Content } = Layout;

class AllUser extends Component {
  render() {
    return (
      <Layout id="main-layout">
        <Header>
          <HeaderApp />
        </Header>
        <Layout>
          <Content className="layout-item ">
            <UserRomeContainers />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default AllUser;
