import React from "react";
import { PageHeader, Button } from "antd";
export default () => {
  return (
    <PageHeader
      tags={[
        <span key="1" id="logo">
          Brain Lap
        </span>
      ]}
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>
      ]}
    />
  );
};
