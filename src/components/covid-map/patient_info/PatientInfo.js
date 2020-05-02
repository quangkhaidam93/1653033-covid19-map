import React, {memo, Fragment} from 'react';
import './PatientInfo.scss';

const PatientInfo = ({patient}) => {
    const date = patient ? patient.verifyDate.substring(0, 10) : "";
    
    return (
        <Fragment>
            <div><span>Name: </span>{patient ? patient.name : ""}</div>
            <div><span>Address: </span>{patient ? patient.address : ""}</div>
            <div><span>Patient Group: </span>{patient ? patient.patientGroup : ""}</div>
            <div><span>Note: </span>{patient ? patient.note : ""}</div>
            <div><span>Verify Date: </span>{date}</div>
        </Fragment>
    )
}

export default memo(PatientInfo);