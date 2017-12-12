let tilePosition = [];
let observer = null;
let tileLetter = "" 

function emitChange() {
  observer(tilePosition, tileLetter);
}

export function observe(o) {
  if(observer) {
    throw new Error('Multiple observers not implemented.');
  }
  observer = o;
  emitChange();
}

export function moveTile(toX, toY) {
  tilePosition = [toX, toY];
  emitChange();
}

export function updateLetter(letter) {
  console.log("????", letter)
  tileLetter = letter
}

export function canMoveTile(toX, toY) {
  // const [x, y] = tilePosition;
  return true
}

