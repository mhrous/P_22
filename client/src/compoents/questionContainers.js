import React, { Fragment } from "react";
import { Progress } from "antd";

export default ({ questions, answers }) => {
  return (
    <Fragment>
      <div className="questions ">{questions}</div>
      <div className="answers">
        {answers.map((e, i) => (
          <div key={i} className="answer">
            {e}
          </div>
        ))}
        <Progress
          className="progress"
          type="circle"
          width={100}
          strokeColor="#1890ff"
          percent={30}
          format={e => <span>{(e * 20) / 100}</span>}
          showInfo={true}
        />
      </div>
    </Fragment>
  );
};
