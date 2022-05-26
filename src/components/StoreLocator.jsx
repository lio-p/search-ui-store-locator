import {
    Grid,
    Stack
} from "@mui/material";
import { React, useState } from 'react'
import StoreSearchBox from "./StoreSearchBox";
import StoreResults from "./StoreResults";
import StoresMap from "./StoresMap";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";


import { SearchProvider, WithSearch } from '@elastic/react-search-ui'

const mapContextToProps = ({
    setSearchTerm,
    setFilter,
    results
}) => ({
    setSearchTerm,
    setFilter,
    results
})

const connector = new AppSearchAPIConnector({
    searchKey: process.env.REACT_APP_APP_SEARCH_API_KEY,
    engineName: "best-buy-stores",
    endpointBase: process.env.REACT_APP_APP_SEARCH_BASE_URL
});

const StoreLocator = () => {


    function transformQueryConfig(queryConfig) {
        queryConfig.boosts = {
            "location": boost
        }
        return queryConfig;
    }

    const config = {
        apiConnector: connector,
        trackUrlState: false,
        searchQuery: {
            search_fields: {
                location: {},
                name: {}
            },
            result_fields: {
                location: { raw: {} },
                name: { raw: {} },
                zip: { raw: {} },
                city: { raw: {} },
                state: { raw: {} },
                address: { raw: {} },
                hours: { raw: {} }
            },
            disjunctiveFacets: [""],
            facets: {}
        },
        alwaysSearchOnInitialLoad: false,
        onSearch: (state, queryConfig, next) => {
            const updateQueryConfig = transformQueryConfig(queryConfig);
            return next(state, updateQueryConfig);
        }
    };

    var boost = {}

    const [center, setCenter] = useState({
        lat: 39,
        lng: -98
    })

    const [selectedPlace, setSelectedPlace] = useState()

    const [zoom, setZoom] = useState(4)



    return (
        <SearchProvider
            config={config}
        >
            <Grid container spacing={2} >
                <WithSearch mapContextToProps={mapContextToProps}>
                    {({

                        setSearchTerm,
                        setFilter,
                        results

                    }) => {
                        const handleStoreSearch = (place) => {
                            
                            if (place.geometry) {
                                const lat = place.geometry.location.lat()
                                const lon = place.geometry.location.lng()
                                const location = {
                                    type: "proximity",
                                    function: "exponential",
                                    "center": lat + "," + lon,
                                    "factor": 1000
                                }
                                boost = location
                                setFilter("location", { center: lat + "," + lon, distance: 50, unit: "km" })
                                setCenter({ lat: lat, lng: lon })
                                setZoom(10)
                                setSelectedPlace(place.formatted_address)
                            }
                        }
                        return (<>
                            <Grid item xs={3} style={{ maxHeight: "600px" }}>
                                <Stack spacing={2}>
                                    <StoreSearchBox selectedPlace={selectedPlace} handleStoreSearch={handleStoreSearch} />
                                    <StoreResults />
                                </Stack>
                            </Grid>
                            <Grid item xs={9}>
                                <StoresMap center={center} zoom={zoom} />
                            </Grid>
                        </>)
                    }}</WithSearch>

            </Grid>
        </SearchProvider>
    )
}
export default StoreLocator;