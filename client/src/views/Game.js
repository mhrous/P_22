import React, { Component } from "react";
import { Layout } from "antd";
import { HeaderApp, QuestionContainers, SideBarGame } from "../compoents";

const { Header, Sider, Content } = Layout;

class Game extends Component {
  render() {
    const { isLoggedIn, _id } = this.props;

    return (
      <Layout id="main-layout">
        <Header>
          <HeaderApp isLoggedIn={isLoggedIn} _id={_id} />
        </Header>
        <Layout>
          <Sider
            id="game-sider"
            width={250}
            theme="light"
            className="layout-item "
          >
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
  }
}
export default Game;
