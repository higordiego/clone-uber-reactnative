
import React from 'react';
import MapViewDirection from 'react-native-maps-directions'

export default function Directions({ destionation, origin, onReady }) {
    console.log('destionation', destionation)
    return (
        <MapViewDirection
            destionation={destionation}
            origin={origin}
            onReady={onReady}
            apikey='AIzaSyA7EaZEDUT_nqFEAssNPfcBQHdrcwSU9VQ'
            strokeWidth={3}
            strokeColor="#222"
        />
    );
}
