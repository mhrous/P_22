import React from "react";
import { Layout } from "antd";
import { HeaderApp, UserRomeContainers } from "../compoents";

const { Header, Content } = Layout;
export default () => (
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
