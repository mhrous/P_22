import React, { PureComponent, Component } from "react";

import { PageHeader, Tag } from "antd";

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import { chartColor } from "../utils";
const generateRandomColor = () =>
  `rgb(${Math.floor(Math.random() * 240)},${Math.floor(
    Math.random() * 240
  )},${Math.floor(Math.random() * 240)})`;

class UserChart extends Component {
  render() {
    let { game, activeCategory, categorys } = this.props;
    const tem = [];
    for (let k of categorys) {
      let i = 0;
      for (let g of game) {
        for (let [category, T, F] of g.statistics) {
          if (category == k) {
            if (!tem[i]) {
              tem.push({ name: i });
            }
            i++;
          }
        }
      }
    }

    for (let [k, v] of Object.entries(activeCategory)) {
      if (v) {
        let i = 0;
        for (let g of game) {
          for (let [category, T, F] of g.statistics) {
            if (category == k) {
              if (!tem[i]) {
                tem.push({ name: i });
              }
              tem[i][category] = Math.round((T / (T + F)) * 100);
              i++;
            }
          }
        }
      }
    }
    return (
      <LineChart
        width={990}
        height={600}
        data={tem}
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
        {Object.entries(activeCategory).map(([k, v]) => {
          if (v) {
            return (
              <Line
                key={k}
                type="monotone"
                dataKey={k}
                stroke={chartColor[k]}
              />
            );
          }
        })}
      </LineChart>
    );
  }
}

const HeaderChart = ({ categorys, activeCategory, toggleCategoryChart }) => {
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
