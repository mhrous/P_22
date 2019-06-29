import React, { PureComponent } from "react";

import { Layout, PageHeader, Tag } from "antd";
import { HeaderApp, UserHeader } from "../compoents";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

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
  "mathcematics",
  "Board Games",
  "Art"
];
const data = [
  {
    name: "jan",
    history: 4000,
    Music: 2400,
    amt: 2400
  },
  {
    name: "feb",
    history: 3000,
    Music: 1398,
    amt: 2210
  },
  {
    name: "mar",
    history: 2000,
    Music: 9800,
    amt: 2290
  },
  {
    name: "apr",
    history: 2780,
    Music: 3908,
    amt: 2000
  },
  {
    name: "may",
    history: 1890,
    Music: 4800,
    amt: 2181
  },
  {
    name: "june",
    history: 2390,
    Music: 3800,
    amt: 2500
  }
];

class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";

  render() {
    return (
      <LineChart
        width={990}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />

        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Music"
          stroke="#073b4c"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="history" stroke="#1890ff" />
      </LineChart>
    );
  }
}

const { Header, Content, Sider } = Layout;
export default () => (
  <Layout id="main-layout">
    <Header>
      <HeaderApp />
    </Header>
    <Layout>
      <Sider id="user-header" width={250} theme="light">
        <UserHeader />
      </Sider>

      <Content className="layout-item ">
        <PageHeader style={{ height: "100px", background: "#fff" }}>
          {array.map((e, i) => (
            <Tag
              key={i}
              style={{ marginBottom: "10px" }}
              color={e === "Music" || e == "History" ? "#108ee9" : ""}
            >
              {e}
            </Tag>
          ))}
        </PageHeader>
        <Example />
      </Content>
    </Layout>
  </Layout>
);
