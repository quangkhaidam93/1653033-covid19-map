import React, {useState, useEffect } from 'react';
import MapView from './mapview/MapView';
import './CovidMap.scss';
import ListView from './listview/ListView';
import PatientInfo from './patient_info/PatientInfo';
import SliderBar from './sliderbar/SliderBar';

const CovidMap = () => {
    const [patients, setPatients] = useState({patientsData: [], patientSlider: []});
    const [selectedPatient, setSelectedPatient] = useState(null);

    const initialDate = "2019-12-08T00:00:00";

    useEffect(() => {
        fetch("https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(res => {
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
                setPatients({patientsData: res.data, patientSlider: newPatients});
                // setPatientSlider(newPatients);
            })
    }, []);

    const handleMarkerClicked = (patient) => {
        setSelectedPatient(patient);
    }

    const handlePatientClicked = (patient) => {
        setSelectedPatient(patient);
    }

    const handleSlider = (checkDate) => {
        const ptSlider = patients.patientsData.filter(patient => patient.verifyDate <= checkDate);
        if (ptSlider.length !== patients.patientSlider.length) {
            const sortedPatientSlider  = ptSlider.sort((a, b) => {
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
            // setPatientSlider(newPatients);
            setPatients({...patients, patientSlider: newPatients});
        }
        else {
            return;
        }
    }

    return (
        <div>
            <div className="Container">
                <section className="MapView">
                    <MapView 
                        patients={patients.patientSlider}
                        onClickMarker={handleMarkerClicked}
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
                            patients={patients.patientSlider}
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