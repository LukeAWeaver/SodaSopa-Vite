export const paginateLeft = (selectedIndex: number, length: number) => {
  const attemptedIndex = selectedIndex - 1;
  if (attemptedIndex < 0) return length - 1;
  return attemptedIndex;
};

export const paginateRight = (selectedIndex: number, length: number) => {
  const attemptedIndex = selectedIndex + 1;
  if (attemptedIndex == length) return 0;
  return attemptedIndex;
};

/* returns a number expressing where on a bell curve this would land where the selected
  where relativeIndex is how far from the selectedIndex we are*/
export const getGaussianBellCurvePosition = (
  magnitude: number,
  offSet: number,
  spread: number,
): number => {
  return magnitude * Math.exp(-Math.pow(offSet, 2) / (2 * Math.pow(spread, 2)));
};

export const getdraggedIndex = (
  dragAmount: number,
  hudWidth: number,
  index: number,
) => {
  const direction = dragAmount > 0 ? 1 : -1;
  const drag = Math.abs(dragAmount);
  const dragLimit = hudWidth / 2;
  const currentDrag = drag < dragLimit ? drag : dragLimit;
  const dragRatio = currentDrag / dragLimit; // 0 - 1 based on
  const draggedIndex = index + dragRatio * direction;
  return draggedIndex;
};
