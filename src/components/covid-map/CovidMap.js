import React, {useState, useEffect } from 'react';
import MapView from '../mapview/MapView';
import './CovidMap.scss';
import ListView from '../listview/ListView';
import PatientInfo from '../patient_info/PatientInfo';
import SliderBar from '../sliderbar/SliderBar';

const CovidMap = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [centerPos, setCenterPos] = useState({lat: 10.762693, lng: 106.682731, isDefault: true });
    const [patientSlider, setPatientSlider] = useState([]);

    const initialDate = "2019-12-08T00:00:00";

    useEffect(() => {
        fetch("https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(res => {
                setPatients(res.data);
                const patientSlider = res.data.filter(patient => patient.verifyDate <= initialDate);
                const sortedPatientSlider  = patientSlider.sort((a, b) => {
                    if (new Date(a.verifyDate) > new Date(b.verifyDate)) {
                        return -1;
                    }
                    else if (new Date(a.verifyDate) < new Date(b.verifyDate)) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
                const newPatients = sortedPatientSlider.map((patient, index) => {
                    return {
                        ...patient,
                        index: index
                    }
                });
                setPatientSlider(newPatients);
            })
    }, []);

    const handleMarkerClicked = (patient) => {
        setSelectedPatient(patient);
        setCenterPos({lat: patient.lat, lng: patient.lng, isDefault: false});
    }

    const handlePatientClicked = (patient) => {
        setSelectedPatient(patient);
        setCenterPos({lat: patient.lat, lng: patient.lng, isDefault: false});
    }

    const handleSlider = (checkDate) => {
        const patientSlider = patients.filter(patient => patient.verifyDate <= checkDate);
        const sortedPatientSlider  = patientSlider.sort((a, b) => {
            if (new Date(a.verifyDate) > new Date(b.verifyDate)) {
                return -1;
            }
            else if (new Date(a.verifyDate) < new Date(b.verifyDate)) {
                return 1;
            }
            else {
                return 0;
            }
        });
        const newPatients = sortedPatientSlider.map((patient, index) => {
            return {
                ...patient,
                index: index
            }
        });
        setPatientSlider(newPatients);
    }
    
    return (
        <div>
            <div className="Container">
                <section className="MapView">
                    <MapView 
                        patients={patientSlider}
                        onClickMarker={handleMarkerClicked}
                        center={centerPos}
                        selectedPatient={selectedPatient}
                    />
                </section>
                <section className="DashBoard">
                    <div className="DashBoard-Title">DashBoard</div>
                    <div className="PatientInfo">
                        <div className="title">Patient Info</div>
                        <PatientInfo patient={selectedPatient} />
                    </div>
                    <div>
                        <div className="title">List View</div>
                        <ListView 
                            patients={patientSlider}
                            itemIndex={selectedPatient ? selectedPatient.index : null}
                            onClickPatient={handlePatientClicked}
                        />
                    </div> 
                </section>
            </div>
            <div className="Container">
                <section className="SliderBar">
                    <SliderBar 
                        handleSlider={handleSlider}
                    />
                </section>
            </div>
        </div>
    )
}

export default CovidMap;