import React from 'react';
import './PatientInfo.scss';

const PatientInfo = (props) => {
    const date = props.patient ? props.patient.verifyDate.substring(0, 10) : "";

    return (
        <div>
            <div><span>Name: </span>{props.patient ? props.patient.name : ""}</div>
            <div><span>Address: </span>{props.patient ? props.patient.address : ""}</div>
            <div><span>Patient Group: </span>{props.patient ? props.patient.patientGroup : ""}</div>
            <div><span>Note: </span>{props.patient ? props.patient.note : ""}</div>
            <div><span>Verify Date: </span>{date}</div>
        </div>
    )
}

export default PatientInfo;