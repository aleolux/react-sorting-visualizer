import React from 'react';
import ArrayVisualiser from '../ArrayVisualiser/ArrayVisualiser';
import Button from 'react-bootstrap/Button';
import DropDownButton from "../Controls/DropDownButton";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { bubbleSortAnimation } from '../Algorithms/bubbleSort';

const ARRAY_LENGTH = 40;
const MIN_VALUE = 2;
const MAX_VALUE = 80;
const ANIMATION_SPEED = 15;

const COLOR_COMPARED = "lightblue";
const COLOR_SWAPPED = "yellow";
const COLOR_SORTED = "green";

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            algo: 0,
        }

        this.containerRef = React.createRef();

        this.changeSortingAlgorithm = this.changeSortingAlgorithm.bind(this);
        this.sort = this.sort.bind(this);
        this.swap = this.swap.bind(this);
        this.resetArray = this.resetArray.bind(this);
    }

    componentDidMount() {
        this.resetArray();
        this.changeSortingAlgorithm(1);
    }

    resetArray() {
        const arr = [];
        for (let i = 0; i < ARRAY_LENGTH; i++) {
            arr.push(randomIntFromRange(MIN_VALUE, MAX_VALUE));
        }
        this.setState({ array: arr });
    }

    changeSortingAlgorithm(value) {
        this.setState({ algo: value });
    }

    sort() {
        console.log(this.state.array);
        let animations = bubbleSortAnimation(this.state.array);
        this.animateArraySorting(animations);
        console.log(this.state.array);
    }

    swap(i, j) {
        const newArr = [...this.state.array];
        const temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
        this.setState({ array: newArr });
    }

    animateArraySorting(animations) {
        animations.forEach(([indexes, isSwapped], idx) => {
            setTimeout(() => {
                if (!isSwapped) {
                    this.colorArrayBar(indexes[0], COLOR_COMPARED);
                    this.colorArrayBar(indexes[1], COLOR_COMPARED);
                } else {
                    this.colorArrayBar(indexes[0], COLOR_SWAPPED);
                    this.colorArrayBar(indexes[1], COLOR_SWAPPED);
                    this.swap(indexes[0], indexes[1]);
                }
            },
                idx * ANIMATION_SPEED
            );
        });
    }

    colorArrayBar(idx, color) {
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

    render() {
        const arr = this.state.array;

        return (
            <div className="app-wrapper">
                <div className="app-header">
                    <DropDownButton onClickMethod={this.changeSortingAlgorithm}></DropDownButton>
                </div>
                <div className="array-container" ref={this.containerRef}>
                    <ArrayVisualiser array={arr}></ArrayVisualiser>
                </div>
                <div className="app-footer">
                    <Button onClick={() => this.sort()}>Sort</Button>
                    <Button onClick={() => this.resetArray()}>Shuffle</Button>
                    <div id="credits">
                        Made with <span style={{ color: `#e25555`, }}>&#9829;</span> by <a href="https://github.com/aleolux" target="_blank">Adrien Timbert</a>
                    </div>
                </div>
            </div>
        )
    }

}

function randomIntFromRange(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}