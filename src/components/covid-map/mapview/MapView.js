import React from 'react';
import {GoogleMap, LoadScript, Marker, InfoBox} from '@react-google-maps/api';
import './MapView.scss';

const MapView = ({patients, onClickMarker, selectedPatient}) => {
    return (
        <LoadScript
            id="script-loader"
            googleMapsApiKey="AIzaSyBCZ5at1ctI-CxNBOt5xiWrktPaWAWXD8s"
        >
            <GoogleMap
                id="GoogleMap"
                mapContainerStyle={{height: "600px", width: "100%"}}
                center={selectedPatient ? {lat: selectedPatient.lat, lng: selectedPatient.lng}
                    : {lat: 10.762693, lng: 106.682731}}
                zoom={selectedPatient ? 12 : 6}
            >
                {
                    patients.map((patient, index) => {
                        if (patient === selectedPatient) {
                            return (
                                <div key={index}>
                                    <Marker
                                        position={{lat: patient.lat, lng: patient.lng}}
                                        onClick={() => onClickMarker(patient)}
                                    />
                                    <div>
                                        <InfoBox
                                            position={{lat: patient.lat, lng: patient.lng}}
                                        >   
                                            <div>
                                                <p>{patient.name}</p>
                                                <p>{patient.address}</p>
                                            </div>   
                                        </InfoBox>
                                    </div>
                                </div> 
                            );
                        }
                        else {
                            return (
                                <div key={index}>
                                    <Marker
                                        position={{lat: patient.lat, lng: patient.lng}}
                                        onClick={() => onClickMarker(patient)}
                                    />
                                </div>
                            )
                        }
                    })
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapView;