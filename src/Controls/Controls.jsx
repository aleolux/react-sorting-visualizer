import React, { useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./style.css";


export default function ToggleButtons({ onClickMethod }) {
    const [radioValue, setRadioValue] = useState(1);

    const radios = [
        { name: 'Bubble Sort', value: 1 },
        { name: 'Insertion Sort', value: 2 },
        { name: 'Selection Sort', value: 3 },
        { name: 'Quick Sort', value: 4 },
        { name: 'Merge Sort', value: 5 },
    ];

    return (
        <>
            <ButtonGroup className="mb-2">
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-secondary"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => { setRadioValue(radio.value); onClickMethod(radio.value); }}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </>
    );
}