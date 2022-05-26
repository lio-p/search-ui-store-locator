
import { React, useEffect, useState } from 'react'
import { GoogleMap } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { withSearch } from "@elastic/react-search-ui";


const StoresMap = ({ center, zoom, results }) => {

    const containerStyle = {
        width: '100%',
        height: '600px',
    };

    const convertPosition = (latLon) => {
        const latLonArr = latLon.split(",")
        const lat = parseFloat(latLonArr[0])
        const lon = parseFloat(latLonArr[1])
        return new window.google.maps.LatLng(lat, lon)
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
        >
            {results.map((r) => (
                <Marker key={r.id.raw} position={convertPosition(r.location.raw)} /> 
            ))} 
            <></>
        </GoogleMap>
    )
}

export default withSearch(({ results }) => ({
    results
}))(StoresMap);