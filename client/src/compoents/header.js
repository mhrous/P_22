import React from "react";
import { PageHeader, Button, Avatar, Badge } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

// const UserDropdown = () => {
//   return (
//     <Menu>
//       <Menu.Item className="header-menue-item ">
//         <Card
//           style={{ width: 300 }}
//           actions={[
//             <Icon type="setting" />,
//             <Icon type="edit" />,
//             <Icon type="ellipsis" />
//           ]}
//         >
//           <Meta
//             avatar={
//               <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//             }
//             title="Card title"
//             description="This is the description"
//           />
//         </Card>
//       </Menu.Item>
//     </Menu>
//   );
// };

// const NotificationsDropdown = () => {};

const HeaderApp = ({ location, isLoggedIn, _id }) => {
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
      extra={
        isLoggedIn
          ? [
              <Badge count={1} key="2" style={{ backgroundColor: "#1890ff" }}>
                <Avatar
                  shape="square"
                  icon="bell"
                  style={{ backgroundColor: "#073b4c", color: "#1890ff" }}
                />
              </Badge>,
              <Link to={`/user/${_id}`} key="1">
                <Avatar
                  style={{ backgroundColor: "#073b4c", color: "#1890ff" }}
                  shape="square"
                  icon="user"
                />
              </Link>
            ]
          : [
              <Link to="/login" key={1}>
                <Button style={{ backgroundColor: "#073b4c", color: "#fff" }}>
                  login
                </Button>
              </Link>,
              <Link to="/register" key={2}>
                <Button style={{ backgroundColor: "#073b4c", color: "#fff" }}>
                  register
                </Button>
              </Link>
            ]
      }
    />
  );
};

export default withRouter(props => <HeaderApp {...props} />);
