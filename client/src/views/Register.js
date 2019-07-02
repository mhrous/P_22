import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { RegisterFrom } from "../compoents";

class Register extends Component {
  render() {
    const { _signup, isLoggedIn } = this.props;
    return isLoggedIn ? (
      <Redirect to="dashboard" />
    ) : (
      <div id="auth">
        <RegisterFrom signup={_signup} />
      </div>
    );
  }
}

export default Register;
