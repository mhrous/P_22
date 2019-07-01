import React, { PureComponent } from "react";

import { PageHeader, Tag } from "antd";

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

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

class UserChart extends PureComponent {
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
        <Line type="monotone" dataKey="Music" stroke="#073b4c" />
        <Line type="monotone" dataKey="history" stroke="#1890ff" />
      </LineChart>
    );
  }
}

const HeaderChart = ({ categorys, activeCategory, toggleCategoryChart }) => {
  console.log({ categorys, activeCategory });
  return (
    <PageHeader style={{ height: "100px", background: "#fff" }}>
      {categorys.map((e, i) => (
        <Tag
          onClick={() => toggleCategoryChart(e)}
          key={i}
          style={{ marginBottom: "10px" }}
          color={activeCategory[e] ? "#108ee9" : ""}
        >
          {e}
        </Tag>
      ))}
    </PageHeader>
  );
};

export { UserChart, HeaderChart };
