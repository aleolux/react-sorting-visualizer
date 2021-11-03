import { swap } from "./swap";

export function insertionSortAnimation(array) {
    const copy = [...array];
    const animations = [];
    insertionSort(copy, animations);
    return animations;
};

function insertionSort(array, animations) {
    for (let i = 1; i < array.length; i++) {
        let j = i;
        animations.push([[i, i], false]);
        while ((j > 0) && (array[j] < array[j - 1])) {
            animations.push([[j, j-1], true]);
            swap(array, j, j - 1);
            j -= 1;
        };
    };
};