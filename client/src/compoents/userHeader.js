import React, { Fragment } from "react";
import { Avatar, Button } from "antd";
import { withRouter } from "react-router-dom";

const UserHeader = ({ location, setPage, logout, _id, user }) => {
  const idPage = location.pathname.split("/")[2];

  return (
    <Fragment>
      <div className="center">
        <Avatar src="https://he-s3.s3.amazonaws.com/media/avatars/mhrous.12345/resized/160/photo.jpg" />
        <div>{user.name}</div>
      </div>
      <div className="user-action">
        <Button block type="primary" onClick={() => setPage(1)}>
          Charts
        </Button>
        <Button block type="primary" onClick={() => setPage(2)}>
          Statistics
        </Button>
        {idPage === _id && (
          <Button block type="primary" onClick={() => logout()}>
            Logout
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(props => <UserHeader {...props} />);
