import React, {useState, useEffect, useCallback, useRef} from 'react';
import Slider from '@material-ui/core/Slider';
import moment from 'moment';
import './SliderBar.scss';

const SliderBar = ({handleSlider}) => {
    const [value, setValue] = useState(0);
    const [playable, setPlayable] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const speedRef = useRef();

    const increaseValue = useCallback(() => {
        const chosenDate = moment(initialDate).add(value, 'days').format('YYYY-MM-DDT00:00:00');
        handleSlider(chosenDate);
        setValue(value + 1);
    }, [value, handleSlider]);

    const today = moment(new Date()).format('YYYY-MM-DDT00:00:00');
    const initialDate = "2019-12-08T00:00:00";

    const endValue = moment(today).diff(initialDate, 'days');

    useEffect(() => {
        if (playable === true) {
            const intervalId = setInterval(increaseValue, speed);
            return () => {
                clearInterval(intervalId);
            }
        }
    }, [playable, increaseValue, speed]);

    useEffect(() => {
        if (value > endValue) {
            setValue(endValue);
            setPlayable(false);
        }
    }, [value, endValue]);

    const autoPlay = () => {
        setPlayable(!playable);
    };

    const valueText = value => {
        const chosenDate = moment(initialDate).add(value, 'days').format('DD/MM/YYYY');
        return `${chosenDate}`;
    }

    const marks = [
        {
            value: 0,
            label: moment(initialDate).format('DD/MM/YYYY')
        },
        {
            value: endValue,
            label: moment(today).format('DD/MM/YYYY')
        }
    ]

    const handleChange = (event, newValue) => {
        const chosenDate = moment(initialDate).add(value, 'days').format('YYYY-MM-DDT00:00:00');
        handleSlider(chosenDate);
        if (playable ===  true) {
            setPlayable(false);
        }
        setValue(newValue);
    }

    const handleOk = () => {
        const speed = speedRef.current.value;
        setSpeed(speed);
    }

    const buttonClass = playable ? 'PlayButton pause' : 'PlayButton';

    console.log("SliderBar rendering...");
    return (
        <div>
            <div className="SliderSection">
                <div className="ButtonArea">
                    <button className={buttonClass} onClick={autoPlay}></button>
                </div>
                <Slider
                    className="Slider"
                    classes = {
                        {
                            valueLabel: "Label", 
                            rail: "Rail",
                            track: "Track",
                            markLabel: "MarkLabel"
                        }
                    }
                    value={value}
                    step={1}
                    valueLabelDisplay="on"
                    valueLabelFormat={valueText}
                    marks={marks}
                    onChange={handleChange}
                    min={0}
                    max={endValue}
                />
                <div className="Speed">
                    <label>Choose speed: </label>
                    <select ref={speedRef} defaultValue={1000}>
                        <option>100</option>
                        <option>250</option>
                        <option>500</option>
                        <option>750</option>
                        <option>1000</option>
                        <option>1250</option>
                        <option>1500</option>
                        <option>2000</option>
                    </select>
                    <button onClick={handleOk}>OK</button>
                </div>
            </div> 
        </div>
    )
};

export default SliderBar;

