import React, { Component } from "react";
import { Layout } from "antd";
import { getJSON } from "../utils";

import { HeaderApp, SideBarDashborad, CardRomeContainers } from "../compoents";

const { Header, Sider, Content } = Layout;

class Dashborader extends Component {
  async componentDidMount() {
    try {
      const { data } = await getJSON("/category");
      this.props._setCategory(data);
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    const {
      categorys,
      difficulty,
      _toggleCategory,
      _toggleDifficulty
    } = this.props;
    return (
      <Layout id="main-layout">
        <Header>
          <HeaderApp />
        </Header>
        <Layout>
          <Sider width="250" theme="light" className="layout-item ">
            <SideBarDashborad
              categorys={categorys}
              toggleCategory={_toggleCategory}
              difficulty={difficulty}
              toggleDifficulty={_toggleDifficulty}
            />
          </Sider>
          <Content className="layout-item ">
            <CardRomeContainers />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Dashborader;
