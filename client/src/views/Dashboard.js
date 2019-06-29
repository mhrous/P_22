import React, { useState } from "react";
import { Layout } from "antd";

import { HeaderApp, SideBarDashborad, CardRomeContainers } from "../compoents";

const { Header, Sider, Content } = Layout;
export default () => {
  const [visibleModel, setVisibleModel] = useState(false);

  return (
    <Layout id="main-layout">
      <Header>
        <HeaderApp />
      </Header>
      <Layout>
        <Sider width="250" theme="light" className="layout-item ">
          <SideBarDashborad />
        </Sider>
        <Content className="layout-item ">
          <CardRomeContainers
            visibleModel={visibleModel}
            setVisibleModel={setVisibleModel}
          />
        </Content>
      </Layout>
    </Layout>
  );
};
