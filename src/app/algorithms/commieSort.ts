import { AnimationArrayType } from "../lib/types";

function runCommieSort(array: number[], animations: AnimationArrayType) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }

  let avg = Math.floor(sum / array.length);
  for (let i = 0; i < array.length; i++) {
    animations.push([[i], false]);
    animations.push([[i, avg], true]);
    array[i] = avg;
  }
}

export function generateCommieSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray: number[] = array.slice();
  runCommieSort(auxiliaryArray, animations);
  runAnimation(animations);
}
