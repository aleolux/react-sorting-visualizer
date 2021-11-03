import { swap } from "./swap";

export function heapSortAnimation(array) {
    const copy = [...array];
    const animations = [];
    heapSort(copy, animations);
    return animations;
};

function heapSort(array, animations) {
    buildMaxHeap(array, animations);
    for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
        swap(array, 0, endIdx);
        animations.push([[0, endIdx], true])
        siftDown(0, endIdx -1, array, animations);
    }
}

function buildMaxHeap(array, animations) {
    const firstParentIndex = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIndex; currentIdx >= 0; currentIdx--) {
        siftDown(currentIdx, array.length - 1, array, animations);
    }
}

function siftDown(currentIdx, endIdx, heap, animations) {
    let childOneIndex = currentIdx * 2 + 1;
    while (childOneIndex <= endIdx) {
        const childTwoIndex = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
        let idxToSwap;
        if (childTwoIndex !== -1 && heap[childTwoIndex] > heap[childOneIndex]) {
            idxToSwap = childTwoIndex;
        }
        else {
            idxToSwap = childOneIndex;
        }
        if (heap[idxToSwap] > heap[currentIdx]) {
            animations.push([[currentIdx, idxToSwap], true])
            swap(heap, currentIdx, idxToSwap);
            currentIdx = idxToSwap;
            childOneIndex = currentIdx * 2 + 1;
        }
        else {
            return;
        }
    }
}