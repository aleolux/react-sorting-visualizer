import React from 'react';
import "./style.css";
import ReactSlider from 'react-slider';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            size: 20,
        }
        this.changeArraySize = this.changeArraySize.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const arr = [];
        for (let i = 0; i < this.state.size; i++) {
            arr.push(randomIntFromRange(5, 100));
        }
        this.setState({ array: arr });
    }

    changeArraySize(value) {
        this.setState({ size: value });
        this.resetArray();
    }

    render() {
        const arr = this.state.array;

        return (
            <div className="visualizer-container">
                <ReactSlider
                    defaultValue={20}
                    min={20}
                    max={100}
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    onChange={(v) => (
                        this.changeArraySize(v)
                    )}></ReactSlider>
                <div className="flex-container">
                    {arr.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                height: `${value}vh`,
                                width: `${100 / this.state.size}vw`,
                            }}>
                        </div>))}
                </div>
            </div>
        );
    }

}


function randomIntFromRange(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}