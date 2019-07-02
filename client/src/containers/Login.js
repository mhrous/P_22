import { connect } from "react-redux";
import { Login } from "../views";
import { signin } from "../actions";
import { push } from "react-router-redux";

const mapStateToProps = ({ USER: { isLoggedIn } }) => {
  return { isLoggedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    async signin({ email, password }) {
      try {
        const obj = await signin({ email, password });
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
)(Login);
