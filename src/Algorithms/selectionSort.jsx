import { swap } from "./swap";

export function selectionSortAnimation(array) {
    const copy = [...array];
    const animations = [];
    selectionSort(copy, animations);
    return animations;
};

function selectionSort(array, animations) {
    let startIdx = 0;
    while (startIdx < array.length - 1) {
        let smallestIdx = startIdx;
        for (let i = startIdx + 1; i < array.length; i++) {
            animations.push([[startIdx, i], false]);
            if (array[smallestIdx] > array[i]) smallestIdx = i;
        };
        animations.push([[startIdx, array[smallestIdx]], true]);
        animations.push([[smallestIdx, array[startIdx]], true]);
        swap(array, startIdx, smallestIdx);
        startIdx ++;
    }
}