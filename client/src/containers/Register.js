import { connect } from "react-redux";
import { Register } from "../views";
import { signup } from "../actions";
import { push } from "react-router-redux";

const mapStateToProps = ({ USER: { isLoggedIn } }) => {
  return { isLoggedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    async _signup({ email, password, name }) {
      try {
        const obj = await signup({ email, password, name });
        dispatch(obj);
        if (obj.type === "LOGIN_SUCCESS") {
          dispatch(push("/dashboard"));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
