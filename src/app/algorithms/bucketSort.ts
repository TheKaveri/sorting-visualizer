import { AnimationArrayType } from "../lib/types";

function runInsertionSort(
  array: number[],
  animations: AnimationArrayType,
  start: number,
  end: number
) {
  if (start >= end) {
    return;
  }

  let i = start;
  while (i <= end) {
    animations.push([[i], false]);
    let j = i;
    while (j > start && array[j - 1] > array[j]) {
      animations.push([[j, array[j - 1]], true]);
      animations.push([[j - 1, array[j]], true]);
      [array[j], array[j - 1]] = [array[j - 1], array[j]];

      animations.push([[j, j - 1], false]);
      j = j - 1;
    }
    i = i + 1;
  }
}

function runBucketSort(array: number[], animations: AnimationArrayType) {
  const M = 1 + Math.max(...array);
  const TOTAL_BUCKETS = 10;

  let buckets: number[][] = Array.from(Array(TOTAL_BUCKETS), () => []);

  let arrayCopy = array.slice();

  for (let i = 0; i < arrayCopy.length; i++) {
    let num = arrayCopy[i];
    let bucket_id = Math.floor((num * TOTAL_BUCKETS) / M);

    buckets[bucket_id].push(num);
  }

  console.log(array.length);

  let start_end_pairs: number[][] = [];
  let i = 0;
  buckets.forEach((bucket) => {
    let start = i;
    while (bucket.length > 0) {
      let num = bucket.shift() as number;

      animations.push([[i, num], true]);
      array[i] = num;

      animations.push([[i], false]);
      i++;
    }
    let end = i - 1;

    // start <= end if the bucket is
    // empty or has a single element.
    start_end_pairs.push([start, end]);
  });

  start_end_pairs.forEach(([start, end]) => {
    runInsertionSort(array, animations, start, end);
  });
}

export function generateBucketSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray: number[] = array.slice();
  runBucketSort(auxiliaryArray, animations);
  runAnimation(animations);
}
