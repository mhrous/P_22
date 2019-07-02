import tagColor from "./tagColor";
import { getJSON, postJSON, putJSON, deleteJSON } from "./httpServices";
import { toggleToken } from "./auth";
import { filterRooms } from "./filter";
const chartColor = {
  Sports: "#f50",
  "Video Games": "#2db7f5",
  Television: "#87d068",
  Music: "#108ee9",
  Politics: "#CD9B1D	",
  History: "#030303",
  Computers: "#8E8E38",
  "Japanese Anime & Manga": "#388E8E",
  Film: "#7D9EC0",
  "Musicals & Theatres": "#7171C6",
  Books: "#8E388E",
  Mythology: "#FF6347",
  "General Knowledge": "#FF7700",
  Geography: "#FF54B5",
  Comics: "#FFFF00",
  Celebrities: "#B3EE3A",
  "Science & Nature": "#76EE00",
  Mathematics: "#00CD00",
  "Board Games": "#43CD80",
  Art: "#008080"
};
export {
  chartColor,
  tagColor,
  getJSON,
  postJSON,
  putJSON,
  deleteJSON,
  toggleToken,
  filterRooms
};
