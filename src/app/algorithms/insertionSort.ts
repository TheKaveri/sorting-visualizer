import { AnimationArrayType } from "../lib/types";

function runInsertionSort(array: number[], animations: AnimationArrayType) {
  let i = 0;
  while (i < array.length) {
    // animations.push([[i], false]);
    let j = i;
    while (j > 0 && array[j - 1] > array[j]) {
      animations.push([[j, array[j - 1]], true]);
      animations.push([[j - 1, array[j]], true]);
      [array[j], array[j - 1]] = [array[j - 1], array[j]];

      animations.push([[j, j - 1], false]);
      j = j - 1;
    }
    i = i + 1;
  }
}

export function generateInsertionSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray: number[] = array.slice();
  runInsertionSort(auxiliaryArray, animations);
  runAnimation(animations);
}
