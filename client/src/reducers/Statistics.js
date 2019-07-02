export default (
  state = {
    game: [],
    categorys: [],
    activeCategory: {},
    infoCategory: {}
  },
  { type, data }
) => {
  switch (type) {
    case "TOGGLE_CATEGORY_CHART":
      let activeCategory;
      if (state.activeCategory[data]) {
        activeCategory = Object.assign({}, state.activeCategory, {
          [data]: undefined
        });
      } else {
        activeCategory = Object.assign({}, state.activeCategory, {
          [data]: true
        });
      }
      return Object.assign({}, state, { activeCategory });
    case "GET_STATISTICS":
      const categorys = [],
        infoCategory = {};
      for (let game of data) {
        for (let item of game.statistics) {
          if (categorys.indexOf(item[0]) !== -1) {
            infoCategory[item[0]].T += item[1];
            infoCategory[item[0]].F += item[2];
            infoCategory[item[0]].N += 1;
          } else {
            categorys.push(item[0]);
            infoCategory[item[0]] = { T: item[1], F: item[2], N: 1 };
          }
        }
      }

      return Object.assign({}, state, {
        game: data,
        categorys,
        infoCategory,
        activeCategory: {}
      });
    default:
      return state;
  }
};
