import React from "react";
import { Layout } from "antd";

import { HeaderApp, SideBarDashborad, CardRomeContainers } from "../compoents";

const { Header, Sider, Content } = Layout;
export default () => (
  <Layout id="main-layout">
    <Header>
      <HeaderApp />
    </Header>
    <Layout>
      <Sider width="250" theme="light" className="layout-item ">
        <SideBarDashborad />
      </Sider>
      <Content className="layout-item ">
        <CardRomeContainers />{" "}
      </Content>
    </Layout>
  </Layout>
);
