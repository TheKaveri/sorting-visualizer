import { AnimationArrayType } from "../lib/types";

function runCocktailSort(array: number[], animations: AnimationArrayType) {
  let swapped = false;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      animations.push([[i, i + 1], false]);
      if (array[i] > array[i + 1]) {
        animations.push([[i, array[i + 1]], true]);
        animations.push([[i + 1, array[i]], true]);
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }

      if (!swapped) {
        // array is sorted
        break;
      }

      swapped = false;
      for (let i = array.length - 1; i > 0; i--) {
        animations.push([[i, i - 1], false]);
        if (array[i - 1] > array[i]) {
          animations.push([[i, array[i - 1]], true]);
          animations.push([[i - 1, array[i]], true]);
          [array[i], array[i - 1]] = [array[i - 1], array[i]];
          swapped = true;
        }
      }
    }
  } while (swapped);
}

export function generateCocktailSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray: number[] = array.slice();
  runCocktailSort(auxiliaryArray, animations);
  runAnimation(animations);
}
