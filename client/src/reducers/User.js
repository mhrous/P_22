import { TOKEN_NAME } from "../config";
import { toggleToken } from "../utils";

export default (
  state = {
    isLoggedIn: false,
    _id: "",
    name: "",
    email: "",
    points: 0,
    color: ""
  },
  { type, data }
) => {
  switch (type) {
    case "LOGOUT":
      localStorage.removeItem(TOKEN_NAME);
      localStorage.removeItem(`${TOKEN_NAME}-data`);
      toggleToken(null);
      return {
        isLoggedIn: false,
        _id: "",
        name: "",
        email: "",
        points: 0,
        color: ""
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem(TOKEN_NAME, data.token);
      localStorage.setItem(`${TOKEN_NAME}-data`, JSON.stringify(data.user));
      toggleToken(data.token);
      return { isLoggedIn: true, ...data.user };

    case "ADD_POINTS":
      return Object.assign({}, state, { points: state.points + data });
    default:
      return state;
  }
};
