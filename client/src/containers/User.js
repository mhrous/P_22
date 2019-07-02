import { connect } from "react-redux";
import { toggleCategoryChart, logout, getStatistics } from "../actions";
import { User } from "../views";

const mapStateToProps = ({
  USER: { isLoggedIn, _id },
  USER_STATISTICS: { game, categorys, activeCategory, infoCategory }
}) => {
  return { categorys, activeCategory, isLoggedIn, _id, game, infoCategory };
};

const mapDispatchToProps = dispatch => {
  return {
    _toggleCategoryChart(data) {
      dispatch(toggleCategoryChart(data));
    },
    _logout() {
      dispatch(logout());
    },
    async _getStatistics(data) {
      dispatch(getStatistics(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
