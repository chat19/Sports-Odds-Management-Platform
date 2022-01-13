export function isToday(inputDate) {
  const today = new Date();
  inputDate = new Date(inputDate);
  return inputDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
}

export function isComing(inputDate) {
  const today = new Date();
  inputDate = new Date(inputDate);
  return inputDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
}

export function filterByObj(array, val, key) {
  /* eslint eqeqeq: 0 */
  return array.filter((innerArray) => innerArray[0][key] == val);
}

export function isValid(game) {
  return (
    isComing(game.GameDateTime) &&
    game.GameStatus === "Open" &&
    game.Format === "Game"
  );
}
