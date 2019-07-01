import React from "react";
import { List, Avatar } from "antd";
const array = [
  { name: "Ahmad", point: 8 },
  { name: "jod Nour", point: 6 },
  { name: "ali", point: 2 },
  { name: "ramr", point: 0 }
];

export const SideBarLobbyLeft = () => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={array}
      renderItem={item => (
        <List.Item style={{ display: "flex", position: "relative" }}>
          <Avatar>{item.name[0].toUpperCase()}</Avatar>
          <div className="name">{item.name}</div>
        </List.Item>
      )}
    />
  );
};
