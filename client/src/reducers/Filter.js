export default (
  state = {
    categorys: {},
    difficulty: {
      easy: false,
      medium: false,
      difficult: false
    }
  },
  { type, data }
) => {
  switch (type) {
    case "SET_CATEGORY":
      return Object.assign({}, state, { categorys: data });
    case "TOGGLE_CATEGORY":
      let categorys = Object.assign({}, state.categorys, {
        [data]: !state.categorys[data]
      });
      return Object.assign({}, state, { categorys });
    case "TOGGLE_DIFFICULTTY":
      let difficulty = Object.assign({}, state.difficulty, {
        [data]: !state.difficulty[data]
      });
      return Object.assign({}, state, { difficulty });
    default:
      return state;
  }
};
