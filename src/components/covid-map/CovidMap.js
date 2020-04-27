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

    useEffect(() => {
        fetch("https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(res => {
                const sortedPatients = res.data.sort((a, b) => {
                    if (new Date(a.verifyDate) > new Date(b.verifyDate)) {
                        return -1;
                    }
                    else if (new Date(a.verifyDate) < new Date(b.verifyDate)) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                })
                const patients = sortedPatients.map((patient, index) => {
                    return {
                        ...patient,
                        index: index
                    }
                })
                setPatients(patients);
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
    
    return (
        <div>
            <div className="Container">
                <section className="MapView">
                    <MapView 
                        patients={patients}
                        onClickMarker={handleMarkerClicked}
                        center={centerPos} 
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
                            patients={patients} 
                            itemIndex={selectedPatient ? selectedPatient.index : null}
                            onClickPatient={handlePatientClicked}
                        />
                    </div> 
                </section>
            </div>
            <div className="Container">
                <section className="SliderBar">
                    <SliderBar />
                </section>
            </div>
        </div>
    )
}

export default CovidMap;