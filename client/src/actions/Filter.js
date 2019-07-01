export const toggleCategory = data => ({
  type: "TOGGLE_CATEGORY",
  data
});

export const toggleDifficulty = data => ({
  type: "TOGGLE_DIFFICULTTY",
  data
});

export const setCategory = data => {
  const obj = {};
  for (let item of data) {
    obj[item.name] = false;
  }

  return {
    type: "SET_CATEGORY",
    data: obj
  };
};
