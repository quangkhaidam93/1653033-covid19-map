import React from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const mapView = (props) => {
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
                    props.patients.map((patient, index) => <Marker
                            key={index}
                            position={{lat: patient.lat, lng: patient.lng}}
                            onClick={() => props.onClickMarker(patient)}
                        > </Marker>) 
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default mapView;