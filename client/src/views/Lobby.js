import React from "react";
import { Layout } from "antd";
import { HeaderApp, SideBarLobbyLeft } from "../compoents";
const { Header, Sider, Content } = Layout;
export default () => (
  <Layout id="main-layout">
    <Header>
      <HeaderApp />
    </Header>
    <Layout>
      <Sider
        id="lobby-sider"
        width="250"
        theme="light"
        className="layout-item "
      >
        <SideBarLobbyLeft />
      </Sider>
      <Content className="layout-item ">Content</Content>
      <Sider width="250" theme="light" className="layout-item ">
        Sider
      </Sider>
    </Layout>
  </Layout>
);
