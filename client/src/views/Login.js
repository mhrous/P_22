import React, { Component } from "react";

import { LogInForm } from "../compoents";

class Login extends Component {
  render() {
    return (
      <div id="auth">
        <LogInForm />
      </div>
    );
  }
}

export default Login;
