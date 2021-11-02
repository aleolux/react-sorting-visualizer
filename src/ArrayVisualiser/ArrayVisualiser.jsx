import React from 'react';
import "./style.css";

/*https://www.robinwieruch.de/react-pass-props-to-component*/

export default class ArrayVisualiser extends React.Component {

    render() {

        return (
            <>
                {this.props.array.map((value, idx) => (
                    <div className="array-bar" 
                        key={idx}  
                        style={{ height: `${value}vmin`, width: `${100 / this.props.array.length}vw`,}}>
                    </div>))}
            </>
        );
    }
}