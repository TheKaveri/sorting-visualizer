import { AnimationArrayType } from "../lib/types";

function partition(
  array: number[],
  lo: number,
  hi: number,
  animations: AnimationArrayType
) {
  let pivot = array[hi];
  let i = lo;

  for (let j = lo; j <= hi - 1; j++) {
    animations.push([[j], false]);
    if (array[j] <= pivot) {
      animations.push([[i, array[j]], true]);
      animations.push([[j, array[i]], true]);
      [array[i], array[j]] = [array[j], array[i]];
      animations.push([[i], false]);
      i++;
    }
  }

  animations.push([[i, array[hi]], true]);
  animations.push([[hi, array[i]], true]);
  [array[i], array[hi]] = [array[hi], array[i]];
  return i;
}

function quicksort(
  array: number[],
  lo: number,
  hi: number,
  animations: AnimationArrayType
) {
  if (lo > hi || lo < 0) {
    return;
  }

  let pivot = partition(array, lo, hi, animations);
  quicksort(array, lo, pivot - 1, animations);
  quicksort(array, pivot + 1, hi, animations);
}

function runQuickSort(array: number[], animations: AnimationArrayType) {
  quicksort(array, 0, array.length - 1, animations);
}

export function generateQuickSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray: number[] = array.slice();
  runQuickSort(auxiliaryArray, animations);
  runAnimation(animations);
}
