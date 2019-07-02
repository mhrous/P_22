export default (state = { users: [] }, { type, data }) => {
  switch (type) {
    case "SET_USERS":
      return Object.assign({}, state, { users: data });
    default:
      return state;
  }
};
