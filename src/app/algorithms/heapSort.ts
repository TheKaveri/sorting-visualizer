import { AnimationArrayType } from "../lib/types";

// heapifies a subtree rooted at node i which is
// an index in arr[]. N is the size of the heap.

// performs the "percolating-down" procedure.
function heapify(
  array: number[],
  N: number,
  i: number,
  animations: AnimationArrayType
) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < N && array[l] > array[largest]) {
    animations.push([[l], false]);
    largest = l;
  }

  if (r < N && array[r] > array[largest]) {
    animations.push([[r], false]);
    largest = r;
  }

  if (largest != i) {
    animations.push([[i, array[largest]], true]);
    animations.push([[largest, array[i]], true]);
    [array[i], array[largest]] = [array[largest], array[i]];

    heapify(array, N, largest, animations);
  }
}

function runHeapSort(array: number[], animations: AnimationArrayType) {
  let N = array.length;

  // first build the heap. We skip the
  // nodes that have no children to save time.
  for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
    animations.push([[i], false]);

    heapify(array, N, i, animations);
  }

  for (let i = N - 1; i > 0; i--) {
    animations.push([[i], false]);
    // swap root (which is the largest element)
    // with the last element.
    animations.push([[0, array[i]], true]);
    animations.push([[i, array[0]], true]);
    [array[0], array[i]] = [array[i], array[0]];

    // call max heapify on the reduced heap
    heapify(array, i, 0, animations);
  }
}

export function generateHeapSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray: number[] = array.slice();
  runHeapSort(auxiliaryArray, animations);
  runAnimation(animations);
}
