export default (
  state = {
    game: [],
    categorys: [
      "Sports",
      "Video Games",
      "Television",
      "Music",
      "Politics",
      "History",
      "Computers",
      "Japanese Anime & Manga",
      "Film",
      "Musicals & Theatres",
      "Books",
      "Mythology",
      "General Knowledge",
      "Geography",
      "Comics",
      "Celebrities",
      "Science & Nature",
      "mathcematics",
      "Board Games",
      "Art"
    ],
    activeCategory: {}
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
    default:
      return state;
  }
};
