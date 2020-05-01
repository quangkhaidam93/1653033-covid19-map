import React from 'react';
import {GoogleMap, LoadScript, Marker, InfoBox} from '@react-google-maps/api';
import './MapView.scss';

const MapView = (props) => {
    return (
        <LoadScript
            id="script-loader"
            googleMapsApiKey="AIzaSyBCZ5at1ctI-CxNBOt5xiWrktPaWAWXD8s"
        >
            <GoogleMap
                id="GoogleMap"
                mapContainerStyle={{height: "600px", width: "100%"}}
                center={{lat: props.center.lat, lng: props.center.lng}}
                zoom={props.center.isDefault ? 6 : 12}
            >
                {
                    props.patients.map((patient, index) => {
                        if (patient === props.selectedPatient) {
                            return (
                                <div key={index}>
                                    <Marker
                                        position={{lat: patient.lat, lng: patient.lng}}
                                        onClick={() => props.onClickMarker(patient)}
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
                                        onClick={() => props.onClickMarker(patient)}
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