import React, { Component } from "react";
import { Layout } from "antd";
import { HeaderApp, SideBarLobbyLeft } from "../compoents";
const { Header, Sider, Content } = Layout;

class Lobby extends Component {
  render() {
    const { isLoggedIn, _id } = this.props;

    return (
      <Layout id="main-layout">
        <Header>
          <HeaderApp isLoggedIn={isLoggedIn} _id={_id} />
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
  }
}

export default Lobby;
