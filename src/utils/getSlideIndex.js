export function getNextSlideIndex(currentIndex, array) {
  return (currentIndex + 1) % array.length;
}

export function getPreviousSlideIndex(currentIndex, array) {
  return (currentIndex - 1 + array.length) % array.length;
}
