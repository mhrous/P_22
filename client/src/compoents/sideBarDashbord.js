import React from "react";
import { List, Checkbox } from "antd";
const array = [
  "Sports",
  "Video Games",
  "Television",
  "Music",
  "Politics",
  "History",
  "Computers",
  "Japanese Anime & Manga",
  "Film",
  "Musicals & Theatres",
  "Books",
  "Mythology",
  "General Knowledge",
  "Geography",
  "Comics",
  "Celebrities",
  "Science & Nature",
  "Mathematics",
  "Board Games",
  "Art"
];

export default () => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={array}
      renderItem={item => (
        <List.Item style={{ display: "flex" }}>
          <Checkbox style={{ marginRight: "10px" }} />
          <div>{item}</div>
        </List.Item>
      )}
    />
  );
};
