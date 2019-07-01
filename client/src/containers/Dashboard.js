import { connect } from "react-redux";
import { Dashboard } from "../views";
import { setCategory, toggleCategory, toggleDifficulty } from "../actions";

const mapStateToProps = ({ FILTER: { categorys, difficulty } }) => {
  return { categorys, difficulty };
};

const mapDispatchToProps = dispatch => {
  return {
    _setCategory(data) {
      dispatch(setCategory(data));
    },
    _toggleCategory(name) {
      dispatch(toggleCategory(name));
    },
    _toggleDifficulty(name) {
      dispatch(toggleDifficulty(name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
