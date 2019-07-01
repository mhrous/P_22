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

const SortMenu = ({ setSortBy, sortBy }) => (
  <Menu
    style={{ width: 140 }}
    onClick={({ key }) => {
      setSortBy(sortBy === key ? "" : key);
    }}
  >
    <Menu.Item key="Best For My">
      Best For My
      {sortBy === "Best For My" && (
        <Icon type="check" className="icon-in-dropdown" />
      )}
    </Menu.Item>
    <Menu.Item key="point">
      point
      {sortBy === "point" && <Icon type="check" className="icon-in-dropdown" />}
    </Menu.Item>

    <Menu.Item key="name">
      name
      {sortBy === "name" && <Icon type="check" className="icon-in-dropdown" />}
    </Menu.Item>
    <Menu.Item key="category">
      category
      {sortBy === "category" && (
        <Icon type="check" className="icon-in-dropdown" />
      )}
    </Menu.Item>

    <Menu.Item key="defcalty">
      defcalty
      {sortBy === "defcalty" && (
        <Icon type="check" className="icon-in-dropdown" />
      )}
    </Menu.Item>
  </Menu>
);

const HeaderPart = ({ setSearch, search, setSortBy, sortBy }) => {
  return (
    <div>
      <Dropdown
        className="sort-by"
        overlay={() => <SortMenu setSortBy={setSortBy} sortBy={sortBy} />}
        trigger={["click"]}
      >
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
          value={search}
          onChange={e =>
            setSearch(e.target.value === " " ? "" : e.target.value)
          }
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
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const showCard = cardData.filter(e =>
    e.name.toLowerCase().startsWith(search.toLowerCase())
  );
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
        <HeaderPart
          setSearch={setSearch}
          search={search}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      </Header>
      <Content className="rooms">
        {showCard.map((card, i) => (
          <RoomCard key={i} card={card} />
        ))}
      </Content>
    </Layout>
  );
};
