import React from "react";
import { Layout } from "antd";
import { HeaderApp } from "../compoents";

const { Header, Content } = Layout;
export default () => (
  <Layout id="main-layout">
    <Header>
      <HeaderApp />
    </Header>
    <Layout>
      <Content className="layout-item ">Content</Content>
    </Layout>
  </Layout>
);
