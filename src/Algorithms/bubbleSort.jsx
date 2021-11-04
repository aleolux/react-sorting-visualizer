import { swap } from "./swap";

export function bubbleSortAnimation(array) {
    const copy = [...array];
    const animations = [];
    bubbleSort(copy, animations);
    return animations;
}

function bubbleSort(array, animations) {
    let isSorted = false;
    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < array.length-1; i++) {
            animations.push([[i, i+1], false]);
            if (array[i] > array[i + 1]) {
                isSorted = false;
                animations.push([[i, array[i+1]], true]);
                animations.push([[i+1, array[i]], true]);
                swap(array, i, i + 1);
            }
        }
    }
}