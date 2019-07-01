import React, { useState } from "react";
import { Input, Button, Icon } from "antd";
import { Link } from "react-router-dom";
import User from "../assets/team.svg";

export default ({ signup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="form">
      <div className="item image-container">
        <img src={User} alt="user" />
      </div>
      <div className="item">
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          size="large"
          placeholder="name"
          onBlur={e => setName(e.target.value)}
        />
      </div>
      <div className="item">
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          size="large"
          placeholder="email"
          onBlur={e => setEmail(e.target.value)}
        />
      </div>
      <div className="item">
        <Input.Password
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          size="large"
          placeholder="password"
          onBlur={e => setPassword(e.target.value)}
        />
      </div>
      <div className="item">
        <Button
          block
          size="large"
          type="primary"
          onClick={() => {
            signup({ password, name, email });
          }}
        >
          Register
        </Button>
      </div>

      <Link to="/login" className="link">
        log in
      </Link>
    </div>
  );
};
