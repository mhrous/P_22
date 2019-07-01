import React, { Fragment } from "react";
import { List, Checkbox } from "antd";
// const array = [
//   "Sports",
//   "Video Games",
//   "Television",
//   "Music",
//   "Politics",
//   "History",
//   "Computers",
//   "Japanese Anime & Manga",
//   "Film",
//   "Musicals & Theatres",
//   "Books",
//   "Mythology",
//   "General Knowledge",
//   "Geography",
//   "Comics",
//   "Celebrities",
//   "Science & Nature",
//   "Mathematics",
//   "Board Games",
//   "Art"
// ];

export default ({
  categorys,
  toggleCategory,
  difficulty,
  toggleDifficulty
}) => {
  return (
    <Fragment>
      <List
        header="categorys"
        itemLayout="vertical"
        size="large"
        dataSource={Object.entries(categorys)}
        renderItem={item => (
          <List.Item
            onClick={() => toggleCategory(item[0])}
            style={{ display: "flex", cursor: "pointer" }}
          >
            <Checkbox style={{ marginRight: "10px" }} checked={item[1]} />
            <div>{item[0]}</div>
          </List.Item>
        )}
      />

      <List
        header="difficulty"
        itemLayout="vertical"
        size="large"
        dataSource={Object.entries(difficulty)}
        renderItem={item => (
          <List.Item
            onClick={() => toggleDifficulty(item[0])}
            style={{ display: "flex", cursor: "pointer" }}
          >
            <Checkbox style={{ marginRight: "10px" }} checked={item[1]} />
            <div>{item[0]}</div>
          </List.Item>
        )}
      />
    </Fragment>
  );
};
