import React from 'react';
import "./style.css";

/*https://www.robinwieruch.de/react-pass-props-to-component*/

export default class ArrayVisualiser extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isMobile) {
            return (<>
                {this.props.array.map((value, idx) => (
                    <div className="array-bar"
                        key={idx}
                        style={{ height: `${100 / this.props.array.length}vmin`, width: `${value}vw`, }}>
                    </div>))}
            </>);
        } else {
            return (
                <>
                    {this.props.array.map((value, idx) => (
                        <div className="array-bar"
                            key={idx}
                            style={{ height: `${value}vmin`, width: `${100 / this.props.array.length}vw`, }}>
                        </div>))}
                </>
            );
        }
    }
}