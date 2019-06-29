import React from "react";

import {
  Layout,
  Input,
  Card,
  Avatar,
  Menu,
  Dropdown,
  Button,
  Icon
} from "antd";

const { Header, Content } = Layout;

const SortMenu = () => (
  <Menu>
    <Menu.Item key="1">Similarities</Menu.Item>
    <Menu.Item key="3">name</Menu.Item>

    <Menu.Item key="2">point</Menu.Item>

    <Menu.Item key="4">rate</Menu.Item>
  </Menu>
);

const HeaderPart = () => {
  return (
    <div>
      <Dropdown className="sort-by" overlay={SortMenu} trigger={["click"]}>
        <Button>
          Sort By <Icon type="down" />
        </Button>
      </Dropdown>
      <div className="header">
        <Input.Search
          size="large"
          placeholder="Search"
          onSearch={value => console.log(value)}
          style={{ width: 300 }}
        />
      </div>
    </div>
  );
};

const userData = [
  {
    name: "ahmad",
    color: "#27365d",
    point: 30,
    rate: 2
  },
  {
    name: "ali",
    color: "#dd23de",
    point: 40,
    rate: 9
  },
  {
    name: "fadi",
    color: "#b3b383",
    point: 80,
    rate: 8.5
  },
  {
    name: "ahmad",
    color: "#27365d",
    point: 30,
    rate: 2
  },
  {
    name: "ali",
    color: "#dd23de",
    point: 40,
    rate: 9
  },
  {
    name: "fadi",
    color: "#b3b383",
    point: 80,
    rate: 8.5
  },
  {
    name: "ahmad",
    color: "#27365d",
    point: 30,
    rate: 2
  },
  {
    name: "ali",
    color: "#dd23de",
    point: 40,
    rate: 9
  },
  {
    name: "fadi",
    color: "#b3b383",
    point: 80,
    rate: 8.5
  }
];

const RoomCard = ({ card: { name, color, point, rate } }) => {
  return (
    <Card
      className="user-card"
      hoverable
      style={{ width: 250, textAlign: "center" }}
      actions={[
        <div>
          <span className="info">Point</span>
          <span className="value">{point}</span>
        </div>,
        <div>
          <span className="info">Rate</span>
          <span className="value">{rate}</span>
        </div>
      ]}
    >
      <Avatar size={120} style={{ backgroundColor: color, fontSize: "26px" }}>
        {name[0].toUpperCase()}
      </Avatar>
      <h2 className="m-t-10">{name}</h2>
    </Card>
  );
};

export default () => {
  return (
    <Layout className="user-containers">
      <Header
        style={{ background: "#f0f2f5", padding: 0, position: "relative" }}
      >
        <HeaderPart />
      </Header>
      <Content className="users">
        {userData.map((card, i) => (
          <RoomCard key={i} card={card} />
        ))}
      </Content>
    </Layout>
  );
};
