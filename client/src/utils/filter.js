const objectToArray = obj => {
  let array = [];
  for (let key in obj) {
    if (obj[key]) array.push(key);
  }
  return array;
};
const filtrRoomsByTypy = (room, arrayType) => {
  let roomType = room.categories.map(categorie => categorie.name);
  for (let type of roomType) {
    if (arrayType.indexOf(type) !== -1) return true;
  }
  return false;
};
export const filterRooms = (categories, difficulty, rooms) => {
  let arrayCategories = objectToArray(categories);
  let arrayDifficulty = objectToArray(difficulty);

  if (arrayCategories.length !== 0) {
    rooms = rooms.filter(room => filtrRoomsByTypy(room, arrayCategories));
  }

  if (arrayDifficulty.length) {
    rooms = rooms.filter(
      room => arrayDifficulty.indexOf(room.difficulty) !== -1
    );
  }

  return rooms;
};
