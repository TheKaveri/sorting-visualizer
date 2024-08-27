import { AnimationArrayType } from "../lib/types";

// we will use the iterative version of merge sort since
// we need an in-place sorting of the auxillary array for
// animations to work.

function merge(
  array: number[],
  left: number,
  mid: number,
  right: number,
  animations: AnimationArrayType
) {
  var leftLen = mid - left + 1;
  var rightLen = right - mid;

  var leftArray = Array(leftLen).fill(0);
  var rightArray = Array(rightLen).fill(0);

  for (let i = 0; i < leftLen; i++) {
    leftArray[i] = array[left + i];
  }
  for (let j = 0; j < rightLen; j++) {
    rightArray[j] = array[mid + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = left;
  while (i < leftLen && j < rightLen) {
    animations.push([[k], false]);
    if (leftArray[i] <= rightArray[j]) {
      animations.push([[k, leftArray[i]], true]);
      array[k] = leftArray[i];
      i++;
    } else {
      animations.push([[k, rightArray[j]], true]);
      array[k] = rightArray[j];
      j++;
    }
    k++;
  }

  while (i < leftLen) {
    animations.push([[k], false]);
    animations.push([[k, leftArray[i]], true]);
    array[k] = leftArray[i];
    i++;
    k++;
  }

  while (j < rightLen) {
    animations.push([[k], false]);
    animations.push([[k, rightArray[j]], true]);
    array[k] = rightArray[j];
    j++;
    k++;
  }
}

function runMergeSort(array: number[], animations: AnimationArrayType) {
  let n = array.length;

  for (let currSize = 1; currSize <= n - 1; currSize = 2 * currSize) {
    for (let start = 0; start < n - 1; start += 2 * currSize) {
      let mid = Math.min(start + currSize - 1, n - 1);
      let end = Math.min(start + 2 * currSize - 1, n - 1);

      merge(array, start, mid, end, animations);
    }
  }
}

export function generateMergeSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray: number[] = array.slice();
  runMergeSort(auxiliaryArray, animations);
  runAnimation(animations);
}
