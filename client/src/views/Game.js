import React from "react";
import { Layout } from "antd";
import { HeaderApp, QuestionContainers, SideBarGame } from "../compoents";

const { Header, Sider, Content } = Layout;
export default () => (
  <Layout id="main-layout">
    <Header>
      <HeaderApp />
    </Header>
    <Layout>
      <Sider id="game-sider" width={250} theme="light" className="layout-item ">
        <SideBarGame />
      </Sider>
      <Content id="game" className="layout-item ">
        <QuestionContainers
          questions="Which of the following sports is not part of the triathlon?"
          answers={["Cycling", "Swimming", "Running", "Horse-Riding"]}
        />
      </Content>
    </Layout>
  </Layout>
);
