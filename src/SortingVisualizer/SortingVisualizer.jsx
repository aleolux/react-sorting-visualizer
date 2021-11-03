import React from 'react';
import ArrayVisualiser from '../ArrayVisualiser/ArrayVisualiser';
import DropDownButton from "../Controls/DropDownButton";

import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { bubbleSortAnimation } from '../Algorithms/bubbleSort';
import { insertionSortAnimation } from '../Algorithms/insertionSwap';
import { selectionSortAnimation } from '../Algorithms/selectionSort';
import { quickSortAnimation } from '../Algorithms/quickSort';
import { heapSortAnimation } from '../Algorithms/heapSort';

const ARRAY_LENGTH = 60;
const ANIMATION_SPEED = 10;
const MIN_VALUE = 3;

const COLOR_COMPARED = "#DE354C";
const COLOR_SWAPPED = "yellow";
const COLOR_SORTED = "#1BBC9B";

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            algo: 0,
            isMobile: false,
            isSorting: false,
        }

        this.containerRef = React.createRef();

        this.changeSortingAlgorithm = this.changeSortingAlgorithm.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }

    componentDidMount() {
        this.resetArray();
        this.changeSortingAlgorithm(0);
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        window.innerWidth <= 760 ? this.setState({ isMobile: true }) : this.setState({ isMobile: false });
    }

    /* GUI methods */
    resetArray() {
        if (this.state.isSorting) return;
        const arr = [];
        for (let i = MIN_VALUE; i < ARRAY_LENGTH + MIN_VALUE; i++) {
            arr.push(i);
        }
        shuffle(arr);
        this.setState({ array: arr });
        this.animateWholeArray('');
    }

    changeSortingAlgorithm(value) {
        this.setState({ algo: value });
    }

    sort() {
        let animations = [];
        switch (this.state.algo) {
            case 0:
                animations = bubbleSortAnimation(this.state.array);
                break;
            case 1:
                animations = insertionSortAnimation(this.state.array);
                break;
            case 2:
                animations = selectionSortAnimation(this.state.array);
                break;
            case 3:
                animations = quickSortAnimation(this.state.array);
                break;
            case 4:
                animations = heapSortAnimation(this.state.array);
                break;
            case 5:
                return;
            default:
                return;
        }
        this.animateArraySorting(animations);
    }

    /* Array methods */
    swap(i, j) {
        const newArr = [...this.state.array];
        const temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
        this.setState({ array: newArr });
    }

    /* Animation methods */
    animateArraySorting(animations) {
        if (this.state.isSorting) return;
        this.setState({ isSorting: true });
        this.resetArrayColor();

        animations.forEach(([indexes, isSwapped], idx) => {
            setTimeout(() => {
                if (!isSwapped) {
                    this.animateArrayBar(indexes[0], COLOR_COMPARED);
                    this.animateArrayBar(indexes[1], COLOR_COMPARED);
                } else {
                    this.animateArrayBar(indexes[0], COLOR_SWAPPED);
                    this.animateArrayBar(indexes[1], COLOR_SWAPPED);
                    this.swap(indexes[0], indexes[1]);
                }
            },
                idx * ANIMATION_SPEED
            );
        });
        setTimeout(() => {
            this.animateWholeArray(COLOR_SORTED);
            this.setState({ isSorting: false });
        },
            animations.length * ANIMATION_SPEED + 10
        );
    }

    animateWholeArray(color) {
        const arrayBars = this.containerRef.current.children;
        this.state.array.forEach((value, idx) => {
            setTimeout(() => {
                const visitedBarStyle = arrayBars[idx].style;
                visitedBarStyle.backgroundColor = color;
            },
                idx * ANIMATION_SPEED);
        }
        );
    }

    animateArrayBar(idx, color) {
        const arrayBars = this.containerRef.current.children;
        const visitedBarStyle = arrayBars[idx].style;
        setTimeout(() => {
            visitedBarStyle.backgroundColor = color;
        },
            ANIMATION_SPEED
        );
        setTimeout(() => {
            arrayBars[idx].style.backgroundColor = '';
        },
            ANIMATION_SPEED * 2
        );
    }

    resetArrayColor() {
        const arrayBars = this.containerRef.current.children;
        this.state.array.forEach((value, idx) => {
            const visitedBarStyle = arrayBars[idx].style;
            visitedBarStyle.backgroundColor = '';
        }
        );
    }

    render() {
        const arr = this.state.array;

        return (
            <div className="app-wrapper">
                <div className="app-header">
                    <DropDownButton onClickMethod={this.changeSortingAlgorithm}></DropDownButton>
                </div>
                <div className="array-container" ref={this.containerRef}>
                    <ArrayVisualiser array={arr} isMobile={this.state.isMobile}></ArrayVisualiser>
                </div>
                <div className="app-footer">
                    <div className="buttons">
                        <button className="app-btn" onClick={() => this.sort()}>Sort</button>
                        <button className="app-btn" onClick={() => this.resetArray()}>Shuffle</button>
                    </div>
                    <div className="credits">
                        <p>Made with <span style={{ color: `#e25555`, }}>&#9829;</span> by <a href="https://github.com/aleolux" target="_blank" rel="noreferrer">Adrien Timbert</a></p>
                    </div>
                </div>
            </div>
        )
    }

}

/* from https://javascript.info/task/shuffle */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* windows event listener from https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs */