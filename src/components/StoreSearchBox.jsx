

import React, { useRef, useState } from "react"; // styled components
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

import {
    Grid,
    Input,
    styled
} from "@mui/material";


const AutocompleteComponent = styled(Autocomplete)(() => ({
    width: "400px",
    height: "3.4375rem",
    borderRadius: "0.375rem",
    border: "1px solid rgba(0,0,0,.5)",
    padding: "1.0625rem 0 1.125rem 1.25rem",
    fontSize: ".875rem",
    fontWeight: "500",
    letterSpacing: ".2px",
    color: "#000",
    marginLeft: "16px",
    marginTop: "6px"
}));

const StoreSearchBox = ({ selectedPlace, handleStoreSearch }) => {
    return (
        <AutocompleteComponent
            onPlaceSelected={handleStoreSearch}
            defaultValue={selectedPlace}
            placeholder="Enter a city..."
            options={{
                componentRestrictions: { country: "us" },
            }}
        />

    )
}

export default StoreSearchBox;


