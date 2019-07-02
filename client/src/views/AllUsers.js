import React, { Component } from "react";
import { Layout } from "antd";
import { HeaderApp, UserCardContainers } from "../compoents";
import { getJSON } from "../utils";

const { Header, Content } = Layout;

class AllUser extends Component {
  async componentDidMount() {
    try {
      const { data } = await getJSON("/users");
      this.props._setUsers(data);
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    const { isLoggedIn, _id, users } = this.props;
    return (
      <Layout id="main-layout">
        <Header>
          <HeaderApp isLoggedIn={isLoggedIn} _id={_id} />
        </Header>
        <Layout>
          <Content className="layout-item ">
            <UserCardContainers users={users} isLoggedIn={isLoggedIn} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default AllUser;
