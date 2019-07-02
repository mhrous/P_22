import React, { useState } from "react";

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

import { Link } from "react-router-dom";
const { Header, Content } = Layout;

const SortMenu = ({ setSortBy, sortBy }) => (
  <Menu
    style={{ width: 125 }}
    onClick={({ key }) => {
      setSortBy(sortBy === key ? "" : key);
    }}
  >
    <Menu.Item key="Similarities">
      Similarities
      {sortBy === "Similarities" && (
        <Icon type="check" className="icon-in-dropdown" />
      )}
    </Menu.Item>
    <Menu.Item key="name">
      name
      {sortBy === "name" && <Icon type="check" className="icon-in-dropdown" />}
    </Menu.Item>

    <Menu.Item key="point">
      point
      {sortBy === "point" && <Icon type="check" className="icon-in-dropdown" />}
    </Menu.Item>

    <Menu.Item key="rate">
      rate
      {sortBy === "rate" && <Icon type="check" className="icon-in-dropdown" />}
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

const UserCard = ({ card: { name, color, points, numTrue, numFalse } }) => {
  return (
    <Card
      className="user-card"
      hoverable
      style={{ width: 250, textAlign: "center" }}
      actions={[
        <div>
          <span className="info">Point</span>
          <span className="value">{points}</span>
        </div>,
        <div>
          <span className="info">Rate</span>
          <span className="value">
            {numTrue === 0 && numFalse === 0
              ? 0
              : Math.round((numTrue / (numTrue + numFalse)) * 100)}
          </span>
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

export default ({ isLoggedIn, users }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const showCard = users.filter(e =>
    e.name.toLowerCase().startsWith(search.toLowerCase())
  );
  return (
    <Layout className="user-containers">
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
      <Content className="users">
        {showCard.map((card, i) => (
          <Link key={i} to={`/user/${card._id}`}>
            <UserCard card={card} />
          </Link>
        ))}
      </Content>
    </Layout>
  );
};
