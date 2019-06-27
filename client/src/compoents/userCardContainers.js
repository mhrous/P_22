import React from "react";

import {
  Layout,
  Input,
  Button,
  Menu,
  Dropdown,
  Icon,
  Card,
  Tag,
  Avatar
} from "antd";

const { Header, Content } = Layout;

const SortMenu = () => (
  <Menu>
    <Menu.Item key="1">Best For My</Menu.Item>
    <Menu.Item key="2">point</Menu.Item>

    <Menu.Item key="3">name</Menu.Item>
    <Menu.Item key="4">category</Menu.Item>

    <Menu.Item key="5">defcalty</Menu.Item>
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

const cardData = [
  {
    name: "Room 1",
    point: 10,
    category: ["Music", "Politics", "Books"],
    player: ["a", "b"]
  },
  {
    name: "Room 2",
    point: 40,
    category: ["Japanese Anime & Manga", "Film"],
    player: ["j", "n"]
  },
  {
    name: "Room 3",
    point: 30,
    category: ["History", "Computers", "Musicals & Theatres"],
    player: ["m", "f", "sduhcsh"]
  }
];

const RoomCard = ({ card: { name, point, category, player } }) => {
  return (
    <Card style={{ width: 300 }}>
      <Card.Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={name}
        description="This is the description"
      />
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
        {cardData.map((card, i) => (
          <RoomCard key={i} card={card} />
        ))}
      </Content>
    </Layout>
  );
};
