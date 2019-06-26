import React from "react";
import { Layout } from "antd";
import { HeaderApp } from "../compoents";

const { Header, Content } = Layout;
export default () => (
  <Layout id="main-layout">
    <Header>
      <HeaderApp />
    </Header>

    <Header style={{ background: "#1890ff", height: "250px" }}>Header</Header>

    <Content className="layout-item ">Content</Content>
  </Layout>
);
