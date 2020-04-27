import React, {useState, useEffect, useCallback} from 'react';
import Slider from '@material-ui/core/Slider';

const SliderBar = (props) => {
    const [value, setValue] = useState(10);
    const [playable, setPlayable] = useState(false);

    const increaseValue = useCallback(() => {
        setValue(value + 1);
    }, [value]);

    useEffect(() => {
        if (playable === true) {
            const intervalId = setInterval(increaseValue, 1000);
            return () => {
                clearInterval(intervalId);
            }
        }
    }, [playable, increaseValue]);

    useEffect(() => {
        if (value > 100) {
            setValue(100);
            setPlayable(false);
        }
        return () => {
            console.log("Hello");
        }
    }, [value]);

    const autoPlay = () => {
        setPlayable(!playable);
    };

    const valueText = value => {
        return `${value}`;
    }

    const marks = [
        {
            value: 0,
            label: '0'
        },
        {
            value: 100,
            label: '100'
        }
    ]

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div>
            <div style={{"width": "800px"}}>
                <Slider
                    value={value}
                    step={1}
                    valueLabelDisplay="on"
                    getAriaValueText={valueText}
                    marks={marks}
                    onChange={handleChange}
                    min={0}
                    max={100}
                />
            </div> 
            <button onClick={autoPlay}>Play</button>
        </div>
    )
};

export default SliderBar;