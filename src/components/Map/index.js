import React, { useCallback, useReducer, useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';

import Search from '../Search'
import Directions from '../Directions'

// const { INITIAL_REDUCER_STATE, reducer } = require('../../reducers/geolocation')

// import { Container } from './styles';

const INITIAL_REDUCER_STATE = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.134,
};

export default function Map() {
    // const [data, dispatch] = useReducer(reducer, INITIAL_REDUCER_STATE);

    const [dataGeolocation, setDataGeolocation] = useState(INITIAL_REDUCER_STATE)
    const [destionation, setDestination] = useState({})

    const position = useCallback(
        function position() {
            Geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    // dispatch({ type: 'INSERT_PAGE', payload: { latitude, longitude } })
                    debugger;
                    setDataGeolocation(prevState => ({ ...prevState, latitude, longitude }))
                },
                (err) => { console.log(err) },
                {
                    timeout: 2000,
                    enableHighAccuracy: true,
                    maximumAge: 1000
                }
            )
        }
    )


    const handlerLocationSelected = useCallback(
        function (data, { geometry }) {
            const { location: { lat: latitude, lng: longitude } } = geometry;
            setDestination({ latitude, longitude, title: data.structured_formatting.main_text })

            console.log(destionation)
            // dispatch({
            //     type: 'DIRECTIONS', payload: {
            //         destionation: {
            //             latitude,
            //             longitude,
            //             title: data.structured_formatting.main_text
            //         }
            //     }
            // })
        }
    )

    useEffect(() => {
        position()
    }, [dataGeolocation]);

    console.log({ dataGeolocation })

    return (
        <View style={{ flex: 1 }} >
            <MapView
                style={{ flex: 1 }}
                region={dataGeolocation}
                showsUserLocation
                loadingEnabled
            >
                {
                    dataGeolocation.destionation && (
                        <Directions
                            origin={dataGeolocation.region}
                            destination={dataGeolocation.destionation}
                            onReady={() => { }}
                        />
                    )
                }
            </MapView>
            <Search onLocationSelected={handlerLocationSelected} />
        </View>
    );
}
