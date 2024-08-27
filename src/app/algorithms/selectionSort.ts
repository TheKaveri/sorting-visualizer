import { AnimationArrayType } from "../lib/types";

function runSelectionSort(array: number[], animations: AnimationArrayType) {
  for (let i = 0; i < array.length - 1; i++) {
    // animations.push([[i], false]);

    let jMin = i;
    for (let j = i; j < array.length; j++) {
      animations.push([[jMin, j], false]);
      if (array[j] < array[jMin]) {
        jMin = j;
      }
    }

    if (jMin != i) {
      animations.push([[i, array[jMin]], true]);
      animations.push([[jMin, array[i]], true]);
      [array[i], array[jMin]] = [array[jMin], array[i]];
    }
  }
}

export function generateSelectionSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray: number[] = array.slice();
  runSelectionSort(auxiliaryArray, animations);
  runAnimation(animations);
}
