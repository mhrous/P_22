import React from "react";
import { PageHeader, Button, Card, Icon, Avatar, Badge, Menu } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const { Meta } = Card;
const UserDropdown = () => {
  return (
    <Menu>
      <Menu.Item className="header-menue-item ">
        <Card
          style={{ width: 300 }}
          actions={[
            <Icon type="setting" />,
            <Icon type="edit" />,
            <Icon type="ellipsis" />
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
      </Menu.Item>
    </Menu>
  );
};

const NotificationsDropdown = () => {};

const HeaderApp = ({ location }) => {
  return (
    <PageHeader
      tags={[
        <span key="1" id="logo">
          Brain Lap
        </span>,
        <Link key="2" to="/dashboard">
          <Button
            type={location.pathname === `/dashboard` ? "primary" : "link"}
            className="header-link"
          >
            dashboard
          </Button>
        </Link>,
        <Link key="3" to="/users">
          <Button
            type={location.pathname === `/users` ? "primary" : "link"}
            className="header-link"
          >
            users
          </Button>
        </Link>
      ]}
      extra={[
        <Badge count={1} key="2" style={{ backgroundColor: "#1890ff" }}>
          <Avatar
            shape="square"
            icon="bell"
            style={{ backgroundColor: "#073b4c", color: "#1890ff" }}
          />
        </Badge>,
        <Avatar
          key="1"
          style={{ backgroundColor: "#073b4c", color: "#1890ff" }}
          shape="square"
          icon="user"
        />
      ]}
    />
  );
};

export default withRouter(props => <HeaderApp {...props} />);
