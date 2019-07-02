import { getJSON } from "../utils";

export const toggleCategoryChart = data => ({
  type: "TOGGLE_CATEGORY_CHART",
  data
});
export const getStatistics = async data => ({
  type: "GET_STATISTICS",
  data
});
