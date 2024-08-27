import { AnimationArrayType } from "../lib/types";

/**
 * I will translate my python implementation of radix sort here. The python
 * implementation can be found in {@link radix_sort.py}.
 */

function runRadixSort(nums: number[], animations: AnimationArrayType) {
  let maxIndex = Math.ceil(Math.log10(Math.max(...nums)));

  for (let index = 0; index < maxIndex; index++) {
    sortByIndex(nums, index, animations);
  }
}

function sortByIndex(
  nums: number[],
  index: number,
  animations: AnimationArrayType
) {
  let buckets = Array.from({ length: 10 }, () => Array(0));

  nums.forEach((num) => {
    let digit = Math.floor(num / 10 ** index) % 10;
    buckets[digit].push(num);
  });

  let i = 0;
  buckets.forEach((bucket) => {
    while (bucket.length != 0) {
      animations.push([[i], false]);

      let value = bucket.shift();
      animations.push([[i, value], true]);
      nums[i] = value;

      i++;
    }
  });
}

export function generateRadixSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray: number[] = array.slice();
  runRadixSort(auxiliaryArray, animations);
  runAnimation(animations);
}
