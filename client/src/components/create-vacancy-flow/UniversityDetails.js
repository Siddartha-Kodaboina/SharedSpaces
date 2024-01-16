import React, { useState, useEffect, useRef } from 'react';
import { generateAddress } from './utilities';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Updated styling using MUI v5 approach
const StyledTextField = styled(TextField)(({ theme }) => ({
    margin: theme.spacing(1),
    minWidth: 120,
    width: '95%',
}));
  
const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    width: '95%',
}));

const UniversityDetails = ({ onPrev, onNext, onPageSubmit, formContent }) => {
  const [universityDetails, setUniversityDetails] = useState(formContent['universityDetails']);
  const autocompleteInput = useRef(null);
  let autocomplete = null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUniversityDetails({ ...universityDetails, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onPageSubmit('universityDetails', universityDetails);
    onNext();
  }

  useEffect(() => {
    autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInput.current,
      {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "name", "photos"],
        types: ["establishment"]
      }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      let updatedUniversityDetails = {
        ...universityDetails,
        ...generateAddress(place.address_components),
        university: place.name
      }
      setUniversityDetails(updatedUniversityDetails);
    });
  }, [universityDetails]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StyledTextField
            label="University"
            type="text"
            name="university"
            value={universityDetails.university}
            onChange={handleChange}
            inputRef={autocompleteInput}
            required
            fullWidth
        />
        </Grid>
<Grid item xs={12}>
<StyledTextField
        label="University Address"
        type="text"
        name="address"
        value={universityDetails.address}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{
            shrink: universityDetails && universityDetails.hasOwnProperty('address') && universityDetails.address!==''
        }}
     />
</Grid>
<Grid item xs={12} sm={4}>
<StyledTextField
        label="City"
        type="text"
        name="city"
        value={universityDetails.city}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{
            shrink: universityDetails && universityDetails.hasOwnProperty('city') && universityDetails.city!==''
        }}
     />
</Grid>
<Grid item xs={12} sm={4}>
<StyledTextField
        label="State"
        type="text"
        name="state"
        value={universityDetails.state}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{
            shrink: universityDetails && universityDetails.hasOwnProperty('state') && universityDetails.state!==''
        }}
     />
</Grid>
<Grid item xs={12} sm={4}>
<StyledTextField
        label="Postal Code"
        type="text"
        name="postal_code"
        value={universityDetails.postal_code}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{
            shrink: universityDetails && universityDetails.hasOwnProperty('postal_code') && universityDetails.postal_code!==''
        }}
     />
</Grid>
<Grid item xs={12}>
<StyledButton 
       variant="contained" 
       color="primary" 
       onClick={handleSubmit}
     >
Next
</StyledButton>
</Grid>
</Grid>
);
}

export default UniversityDetails;