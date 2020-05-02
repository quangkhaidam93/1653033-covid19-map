import React, {useRef, memo, useEffect} from 'react';
import { FixedSizeList as FixedList, areEqual } from 'react-window';
import './ListView.scss';

const ListView = ({patients, itemIndex, onClickPatient}) => {
    const listRef = useRef();

    const Row = memo(props => {
        const {data, index, style} = props;
        const className = data.itemIndex === index ? 'PatienIndicator Highlight' : 'PatientIndicator';
        return (<button
            key={index} 
            className={className}
            onClick={() => data.onClickPatient(data.patients[index])}
            style={style}     
        >
            {data.patients[index].name}
        </button>)
    }, areEqual);
    
    const patientsLength = patients ? Object.keys(patients).length : 0;

    const data = Object.assign({}, {patients: patients}, {onClickPatient: onClickPatient}, {itemIndex: itemIndex});
    
    useEffect(() => {
        if (itemIndex) {
            listRef.current.scrollToItem(itemIndex, 'smart');
        }
    })

    return (
        <FixedList
            className="List"
            height={300}
            itemCount={patientsLength}
            itemSize={50}
            width={"100%"}
            ref={listRef}
            itemData={data}
        >
            {Row}
        </FixedList>
    )
}

export default memo(ListView);