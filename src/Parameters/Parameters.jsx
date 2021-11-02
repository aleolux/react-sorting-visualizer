import React from 'react';
import ReactSlider from 'react-slider';
import Slider from "../Slider/Slider";

import "./style.css";

export default class Parameters extends React.Component {
    render() {
        return (
            <div>
            <h3>Parameters</h3>
                <ReactSlider
                    defaultValue={20}
                    min={20}
                    max={100}
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    onChange={(v) => (
                        this.props.onChangeMethod(v)
                )}></ReactSlider>
            </div>
        );
    }
}