import React, { Fragment } from "react";
import { Avatar, Button } from "antd";

export default () => {
  return (
    <Fragment>
      <div className="center">
        <Avatar src="https://he-s3.s3.amazonaws.com/media/avatars/mhrous.12345/resized/160/photo.jpg" />
        <div>Ahmad Nour Alden</div>
      </div>
      <div className="user-action">
        <Button block type="primary">
          Charts
        </Button>
        <Button block type="primary">
          Statistics
        </Button>
        <Button block type="primary">
          Settings
        </Button>
        <Button block type="primary">
          Logout
        </Button>
      </div>
    </Fragment>
  );
};
