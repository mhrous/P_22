import React from "react";
import { Layout } from "antd";
import { HeaderApp } from "../compoents";
const { Header, Sider, Content } = Layout;
export default () => (
  <Layout id="main-layout">
    <Header>
      <HeaderApp />
    </Header>
    <Layout>
      <Sider theme="light" className="layout-item ">
        Sider
      </Sider>
      <Content className="layout-item ">Content</Content>
    </Layout>
  </Layout>
);
