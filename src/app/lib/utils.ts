import { generateBubbleSortAnimationArray } from "../algorithms/bubbleSort";
import { generateCocktailSortAnimationArray } from "../algorithms/cocktailSort";
import { generateCommieSortAnimationArray } from "../algorithms/commieSort";
import { generateHeapSortAnimationArray } from "../algorithms/heapSort";
import { generateInsertionSortAnimationArray } from "../algorithms/insertionSort";
import { generateMergeSortAnimationArray } from "../algorithms/mergeSort";
import { generateQuickSortAnimationArray } from "../algorithms/quickSort";
import { generateRadixSortAnimationArray } from "../algorithms/radixSort";
import { generateSelectionSortAnimationArray } from "../algorithms/selectionSort";
import { generateBucketSortAnimationArray } from "../algorithms/bucketSort";
import { AnimationArrayType, SortingAlgorithmType } from "./types";

export const MIN_ANIMATION_SPEED = 100;
export const MAX_ANIMATION_SPEED = 400;

export function generateRandomNumberFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const algorithmOptions = [
  { label: "Bubble", value: "bubble" },
  { label: "Bucket", value: "bucket" },
  { label: "Cocktail", value: "cocktail" },
  { label: "Heap", value: "heap" },
  { label: "Insertion", value: "insertion" },
  { label: "Merge", value: "merge" },
  { label: "Quick", value: "quick" },
  { label: "Radix", value: "radix" },
  { label: "Selection", value: "selection" },
  { label: "Commie ⭐️", value: "commie" },
];

export function generateAnimationArray(
  selectedAlgorithm: SortingAlgorithmType,
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  switch (selectedAlgorithm) {
    case "bubble":
      generateBubbleSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "selection":
      generateSelectionSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "insertion":
      generateInsertionSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "merge":
      generateMergeSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "quick":
      generateQuickSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "heap":
      generateHeapSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "radix":
      generateRadixSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "commie":
      generateCommieSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "cocktail":
      generateCocktailSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "bucket":
      generateBucketSortAnimationArray(isSorting, array, runAnimation);
      break;
    default:
      break;
  }
}

export const sortingAlgorithmsData = {
  bubble: {
    title: "Bubble Sort",
    description:
      "Bubble Sort is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.  This process continues until the list is fully sorted.",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n)",
  },
  insertion: {
    title: "Insertion Sort",
    description:
      "Insertion sort is a comparison-based simple sorting algorithm that works by iterating through the array, comparing each element with the elements to its left. If the current element is smaller, it is shifted to the left until it finds its correct position.",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n)",
  },
  selection: {
    title: "Selection Sort",
    description:
      "Selection sort is a comparison-based sorting algorithm that repeatedly finds the minimum element in the unsorted portion of the aray and swaps it with the first element of that portion. This process is repeated until the entire array is sorted.",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n²)",
  },
  merge: {
    title: "Merge Sort",
    description:
      "Merge sort is a divide-and-conquer algorithm that breaks down an unsorted list into smaller and smaller sublists, until each sublist contains only one element (which is considered sorted). These sorted sublists are then merged back together in a way that preserves the sorted order, resulting in a fully sorted list. Merge sort is my personal fav 😛.",
    worstCase: "O(n log n)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
  },
  quick: {
    title: "Quick Sort",
    description:
      "Quick sort is a divide-and-conquer algorithm that partitions the input array into two subarrays based on a pivot element. Elements less than the pivot are placed to it's left, and elements greater than the pivot are placed to it's right. The subarrays are then recursively sorted using quicksort.",
    worstCase: "O(n²)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
  },
  heap: {
    title: "Heap Sort",
    description:
      "Heap sort is a sorting algorithm that uses a heap data structure to efficiently sort elements. It can be thought of as an improvement on selection sort using the right data structure. A heap is a complete binary tree where the value of each node is greater than or equal to its children. Heap sort involves building a max heap from the input array, extracting the maximum element and placing it at the end of the array, and repeating this process until the entire array is sorted.",
    worstCase: "O(n log n)",
    averageCase: "O(n log n)",
    bestCase: "O(n log n)",
  },
  radix: {
    title: "Radix Sort",
    description:
      "Radix sort is a non-comparison sorting algorithm that sorts elements by repeatedly grouping elements by their digits. It's efficient for large datasets and works well when elements can be represented by digits (or characters). Note 'd' in the description refers to the number of digits in the largest element in the array.",
    worstCase: "O(n⋅d)",
    averageCase: "O(n⋅d)",
    bestCase: "O(n⋅d)",
  },
  commie: {
    title: "Commie Sort - A classless classic (Joke)",
    description:
      "Commie sort is a sorting algorithm that takes inspiration from Karl Marx's 'From each according to his ability, to each according to his needs'. The algorithm calculates the average value of the array's elements and replaces all elements with this average, symbolizing the concept of equal distribution. Sorry.",
    worstCase: "O(n) - seriously!",
    averageCase: "O(n)",
    bestCase: "O(n)",
  },
  cocktail: {
    title: "Cocktail Sort",
    description:
      "Cocktail sort, a.k.a. bi-directional bubble sort, is an extension of bubble sort. Unlike the traditional bubble sort, which only operates from left to right, cocktail sort alternates between left-to-right and right-to-left passes through the list. While it improves on bubble sort by more quickly moving items to the beginning of the list, performance improvements are marginal.",
    worstCase: "O(n²)",
    averageCase: "O(n²)",
    bestCase: "O(n)",
  },
  bucket: {
    title: "Bucket Sort",
    description:
      "Bucket sort is a sorting algorithm that works by dividing the input elements into buckets based on their range. Elements within each bucket are then sorted recursively or by using a simpler sorting algorithm. I have used insertion sort here as it works well on smaller arrays. Finally, the sorted buckets are concatenated to get the fully sorted array. Bucket sort is most efficient when the input elements are uniformly distributed. Note: k means the number of buckets",
    worstCase: "O(n²)",
    averageCase: "O(n+n²/k+k)",
    bestCase: "O(n+k)",
  },
};
