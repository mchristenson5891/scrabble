let tilePosition = [0,0];
let observer = null;

function emitChange() {
  observer(tilePosition);
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

export function canMoveTile(toX, toY) {
  const [x, y] = tilePosition;
  return (toX === 7) && (toY === 7)
}