import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function DropDownButton({onClickMethod}) {

    const [algo, setAlgo] = useState(0);
    const algos = [
        { name: 'Bubble Sort', value: 0 },
        { name: 'Insertion Sort', value: 1 },
        { name: 'Selection Sort', value: 2 },
        { name: 'Quick Sort', value: 3 },
        { name: 'Heap Sort', value: 4 },
        { name: 'Merge Sort', value: 5 },
    ];

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="secondary"
                className="mt-2"
                size="lg"
                style={ddStyle}>
                {algos[algo].name}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                {algos.filter(item => item.value !== algo).map(
                    item => <Dropdown.Item
                            key={item.value}
                            onClick={ () => {setAlgo(item.value); onClickMethod(item.value)}}
                            >{item.name}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    );

}

const ddStyle = {
    margin: `5%`,
    backgroundColor: `#283747`,
    color: `F3F3F3`,
}