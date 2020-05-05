import React, {useState, useEffect, Fragment } from 'react';
import MapView from './mapview/MapView';
import './CovidMap.scss';
import ListView from './listview/ListView';
import PatientInfo from './patient_info/PatientInfo';
import SliderBar from './sliderbar/SliderBar';
import LinkContainer from '../LinkContainer/LinkContainer';
import {Link} from 'react-router-dom';
import axios from 'axios';

const CovidMap = () => {
    const [patients, setPatients] = useState({patientsData: [], patientSlider: []});
    const [selectedPatient, setSelectedPatient] = useState(null);

    const initialDate = "2019-12-08T00:00:00";

    useEffect(() => {
        axios.get("https://cors-anywhere.herokuapp.com/maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => {
                const patientSlider = res.data.data.filter(patient => patient.verifyDate <= initialDate);
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
                setPatients({patientsData: res.data.data, patientSlider: newPatients});
            });
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
            setPatients({...patients, patientSlider: newPatients});
        }
        else {
            return;
        }
    }

    return (
        patients.patientsData.length === 0 ? <div className="Loading">Loading...</div> :
        <Fragment>
            <section className="Navigation">
                <Link to="/" className="Link">
                    <LinkContainer active={true}>Covid19 Map</LinkContainer>
                </Link>
                <Link to="/stats" className="Link">
                    <LinkContainer active={false}>Covid19 Stats</LinkContainer>
                </Link>
            </section>
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
        </Fragment>
    )
}

export default CovidMap;