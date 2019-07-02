import { connect } from "react-redux";
import { Lobby } from "../views";

const mapStateToProps = ({ USER: { isLoggedIn, _id } }) => {
  return { isLoggedIn, _id };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
