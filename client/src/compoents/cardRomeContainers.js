import React, { useState } from "react";

import {
  Layout,
  Input,
  Button,
  Menu,
  Dropdown,
  Icon,
  Card,
  Tag,
  Avatar,
  Modal
} from "antd";

import { tagColor } from "../utils";

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
    <Card hoverable style={{ width: 280 }} className="room-card">
      <p className="name">{name}</p>
      <p className="point">{point}</p>
      <div className="category">
        {category.map((e, i) => (
          <Tag key={i} color={tagColor[e]}>
            {e}
          </Tag>
        ))}
      </div>
      <div className="player">
        {player.map((e, i) => (
          <Avatar key={i}>{e[0].toUpperCase()}</Avatar>
        ))}
      </div>
    </Card>
  );
};

const AddRoomModel = () => <div>model</div>;

export default () => {
  const [visibleModel, setVisibleModel] = useState(false);
  return (
    <Layout className="room-containers">
      <Modal
        title="Basic Modal"
        visible={visibleModel}
        onOk={() => setVisibleModel(false)}
        onCancel={() => setVisibleModel(false)}
      >
        <AddRoomModel />
      </Modal>
      <Button
        type="primary"
        className="add-new-room"
        shape="circle"
        icon="plus"
        size="large"
        onClick={() => setVisibleModel(true)}
      />

      <Header
        style={{ background: "#f0f2f5", padding: 0, position: "relative" }}
      >
        <HeaderPart />
      </Header>
      <Content className="rooms">
        {cardData.map((card, i) => (
          <RoomCard key={i} card={card} />
        ))}
      </Content>
    </Layout>
  );
};
