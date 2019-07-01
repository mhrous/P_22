import React, { Component } from "react";

import { RegisterFrom } from "../compoents";

class Register extends Component {
  render() {
    const { _signup } = this.props;
    return (
      <div id="auth">
        <RegisterFrom signup={_signup} />
      </div>
    );
  }
}

export default Register;
