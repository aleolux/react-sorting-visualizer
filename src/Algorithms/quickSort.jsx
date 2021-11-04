import { swap } from "./swap";

export function quickSortAnimation(array) {
    const copy = [...array];
    const animations = [];
    quickSort(copy, 0, copy.length - 1, animations);
    return animations;
}

function quickSort(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return;
    const pivotIdx = startIdx;
    let leftIdx = startIdx + 1;
    let rightIdx = endIdx;
    while (rightIdx >= leftIdx) {
        animations.push([[leftIdx, rightIdx], false]);
        if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
            animations.push([[leftIdx, array[rightIdx]], true]);
            animations.push([[rightIdx, array[leftIdx]], true]);
            swap(array, leftIdx, rightIdx);
        }
        if (array[leftIdx] <= array[pivotIdx]) leftIdx++;
        if (array[rightIdx] >= array[pivotIdx]) rightIdx--;
    }
    animations.push([[pivotIdx, array[rightIdx]], true]);
    animations.push([[rightIdx, array[pivotIdx]], true]);
    swap(array, pivotIdx, rightIdx);
    const leftSubArrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
    if (leftSubArrayIsSmaller) {
        quickSort(array, startIdx, rightIdx - 1, animations);
        quickSort(array, rightIdx + 1, endIdx, animations);
    } else {
        quickSort(array, rightIdx + 1, endIdx, animations);
        quickSort(array, startIdx, rightIdx - 1, animations);
    }
}