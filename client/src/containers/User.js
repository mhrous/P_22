import { connect } from "react-redux";
import { toggleCategoryChart } from "../actions";
import { User } from "../views";

const mapStateToProps = ({
  USER_STATISTICS: { categorys, activeCategory }
}) => {
  return { categorys, activeCategory };
};

const mapDispatchToProps = dispatch => {
  return {
    _toggleCategoryChart(data) {
      dispatch(toggleCategoryChart(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
