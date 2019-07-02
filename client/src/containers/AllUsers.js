import { connect } from "react-redux";
import { AllUsers } from "../views";
import { setUsers } from "../actions";

const mapStateToProps = ({
  USER: { isLoggedIn, _id },
  ALL_USERS: { users }
}) => {
  return { isLoggedIn, _id, users };
};

const mapDispatchToProps = dispatch => {
  return {
    _setUsers(data) {
      dispatch(setUsers(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUsers);
