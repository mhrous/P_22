import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { LogInForm } from "../compoents";

class Login extends Component {
  render() {
    const { isLoggedIn, signin } = this.props;

    return isLoggedIn ? (
      <Redirect to="dashboard" />
    ) : (
      <div id="auth">
        <LogInForm signin={signin} />
      </div>
    );
  }
}

export default Login;
