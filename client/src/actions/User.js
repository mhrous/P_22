import { postJSON } from "../utils";

export const signin = async ({ email, password }) => {
  try {
    const { data } = await postJSON("/signin", { email, password });
    return {
      type: "LOGIN_SUCCESS",
      data
    };
  } catch (e) {
    console.error(e);
  }
};

export const signup = async ({ email, password, name }) => {
  try {
    const { data } = await postJSON("/signup", { email, password, name });

    return {
      type: "LOGIN_SUCCESS",
      data
    };
  } catch (e) {
    console.error(e);
  }
};

export const addPoints = data => ({
  type: "ADD_POINTS",
  data
});

export const logout = () => ({
  type: "LOGOUT"
});
