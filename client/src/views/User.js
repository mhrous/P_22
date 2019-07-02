import React, { Component, Fragment } from "react";

import { Layout, Table, Card, Statistic, Divider } from "antd";
import { getJSON } from "../utils";
import { HeaderApp, UserHeader, UserChart, HeaderChart } from "../compoents";

const { Header, Content, Sider } = Layout;
const gridStyle = {
  width: "50%",
  textAlign: "center"
};

const columns = [
  {
    title: "index",
    dataIndex: "index",
    render: key => key + 1
  },
  {
    title: "category 1",
    dataIndex: "statistics[0]",
    render: key => (
      <Card size="small" title={key[0]} style={{ textAlign: "center" }}>
        <Card.Grid style={gridStyle}>
          <Statistic
            title="True"
            value={key[1]}
            valueStyle={{ color: "#87d068" }}
          />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Statistic
            title="False"
            value={key[2]}
            valueStyle={{ color: "#A8201A" }}
          />
        </Card.Grid>
      </Card>
    )
  },
  {
    title: "category 2",
    dataIndex: "statistics[1]",
    render: key =>
      key ? (
        <Card size="small" title={key[0]} style={{ textAlign: "center" }}>
          <Card.Grid style={gridStyle}>
            <Statistic
              title="True"
              value={key[1]}
              valueStyle={{ color: "#87d068" }}
            />
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Statistic
              title="False"
              value={key[2]}
              valueStyle={{ color: "#A8201A" }}
            />
          </Card.Grid>
        </Card>
      ) : null
  },
  {
    title: "category 3",
    dataIndex: "statistics[2]",
    render: key =>
      key ? (
        <Card size="small" title={key[0]} style={{ textAlign: "center" }}>
          <Card.Grid style={gridStyle}>
            <Statistic
              title="True"
              value={key[1]}
              valueStyle={{ color: "#87d068" }}
            />
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Statistic
              title="False"
              value={key[2]}
              valueStyle={{ color: "#A8201A" }}
            />
          </Card.Grid>
        </Card>
      ) : null
  }
];

const GameColumns = [
  { title: "category", dataIndex: "[0]" },
  { title: "True", dataIndex: "[1].T" },

  { title: "False", dataIndex: "[1].F" },

  {
    title: "Rate",
    dataIndex: "[1]",
    render: k => Math.round((k.T / (k.T + k.F)) * 100)
  },
  { title: "Count", dataIndex: "[1].N" }
];
class User extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 2, user: {} };
  }
  async componentDidMount() {
    try {
      const {
        location: { pathname }
      } = this.props;
      const id = pathname.split("/")[2];
      const { data } = await getJSON(`/statistics/${id}`);
      const { data: user } = await getJSON(`/users/${id}`);
      this.setState({ user });

      this.props._getStatistics(data);
    } catch (e) {
      console.error(e);
    }
  }
  setPage = page => {
    this.setState({ page });
  };
  render() {
    const {
      categorys,
      activeCategory,
      _toggleCategoryChart,
      _logout,
      isLoggedIn,
      _id,
      game,
      infoCategory
    } = this.props;
    const { page } = this.state;
    return (
      <Layout id="main-layout">
        <Header>
          <HeaderApp isLoggedIn={isLoggedIn} _id={_id} />
        </Header>
        <Layout>
          <Sider id="user-header" width={250} theme="light">
            <UserHeader
              setPage={this.setPage}
              logout={_logout}
              _id={_id}
              user={this.state.user}
            />
          </Sider>

          <Content className="layout-item ">
            {page === 1 && (
              <Fragment>
                <HeaderChart
                  categorys={categorys}
                  activeCategory={activeCategory}
                  toggleCategoryChart={_toggleCategoryChart}
                />
                <UserChart
                  categorys={categorys}
                  game={game}
                  activeCategory={activeCategory}
                />
              </Fragment>
            )}
            {page === 2 && (
              <Fragment>
                <Table
                  dataSource={Object.entries(infoCategory)}
                  columns={GameColumns}
                  rowKey="index"
                />
                <Divider />
                <Table dataSource={game} columns={columns} rowKey="[0]" />
              </Fragment>
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default User;
