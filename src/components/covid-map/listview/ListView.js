import React, {useRef, memo, useEffect} from 'react';
import { FixedSizeList as FixedList, areEqual } from 'react-window';
import './ListView.scss';

const ListView = props => {
    const listRef = useRef();

    const Row = memo(props => {
        console.log("Row rendering...");
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
    
    const patientsLength = props.patients ? Object.keys(props.patients).length : 0;

    const data = Object.assign({}, {patients: props.patients}, {onClickPatient: props.onClickPatient}, {itemIndex: props.itemIndex});
    
    console.log('List View rendering...');

    useEffect(() => {
        if (props.itemIndex) {
            listRef.current.scrollToItem(props.itemIndex, 'smarter');
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