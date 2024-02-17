
import React, { useState, useEffect, useRef } from 'react';
import { generateAddress } from './utilities';
import {
    TextField, Button, Grid, Typography, FormControl, 
    InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox,
    IconButton, InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {numberFieldParameters, numberFieldsInText} from './utilities';

const CommunityHousing = ({ onPrev, onNext, onPageSubmit, communityDetails, housingType }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [fileContent, setFileContent] = useState([]);
    const [communityHousingDetails, setCommunityHousingDetails] = useState(communityDetails);
    const autocompleteInput = useRef(null);
    let autocomplete = null;
    const houingTypeString = housingType==='individual' ? 'Property' : 'Community';
    const [averageRent, setAverageRent] = useState(0);
    
    // ... Existing useEffect for fileContent and autocomplete ...
    useEffect(() => {
        const filePath = './community-amenities-options.txt';

        fetch(filePath)
            .then(response => response.text())
            .then(text => {
                setFileContent(text.split('\n').map((line, index)=>({id: index+1, option_value: line})));
            })
            .catch(error => {
                console.error('Error fetching the text file: ', error);
            });
    }, []);

    useEffect(() => {
        autocomplete = new window.google.maps.places.Autocomplete(
            autocompleteInput.current,
            {
                componentRestrictions: { country: "us" },
                fields: ["place_id", "address_components", "name", "photos"],
                types:["establishment"]
            }
        );

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            // Handle the selected place
            // console.log(place);
            let updatedCommunityHousingDetails = {
                ...communityHousingDetails,
                ...generateAddress(place.address_components),
                title: place.name,
                place_id: place.place_id,
                photo_urls: place.photos.map((photo)=> [photo.width, photo.height, photo.getUrl()])
            }
            
            setCommunityHousingDetails(updatedCommunityHousingDetails);
        });
    }, [communityHousingDetails]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        let newValue = value;
        if(name === 'averageRent'){
            newValue = Math.max(0, Math.min(numberFieldParameters.averageRent.limit, Number(e.target.value)));
        }
        if(name === 'totalPlots'){
            newValue = Math.max(0, Math.min(numberFieldParameters.totalPlots.limit, Number(e.target.value)));
        } 
        if(numberFieldsInText.includes(name)){
            newValue = newValue.replace(/[^0-9]/g, '');
        }
        setCommunityHousingDetails({ ...communityHousingDetails, [name]: newValue });
    };

    const handleCheckboxChange = (event) => {
        setSelectedOptions(event.target.value);
    };

    const handleSubmit = (buttonName) => {
        onPageSubmit('communityDetails', communityHousingDetails);
        buttonName === 'next' ? onNext() : onPrev();
    };

    const handleIncrement = (key) => {
        if (!communityHousingDetails.hasOwnProperty(key) || communityHousingDetails[key] < numberFieldParameters[key].limit) {
            setCommunityHousingDetails(prevDetails => ({
                ...prevDetails,
                [key]: prevDetails.hasOwnProperty(key)? prevDetails[key] + numberFieldParameters[key].step:  numberFieldParameters[key].step
            }));
        }
    };
      
    const handleDecrement = (key) => {
        if (communityHousingDetails[key] > 0) {
            setCommunityHousingDetails(prevDetails => ({
                ...prevDetails,
                [key]: prevDetails[key] -  numberFieldParameters[key].step
            }));
        }
    };

    // const numberFieldParameters = {
    //     totalPlots: {
    //         limit: 500,
    //         step: 10
    //     },
    //     averageRent: {
    //         limit: 500,
    //         step: 5
    //     }
    // }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Community Housing Information</Typography>
            </Grid>
            {/* Community Name/Title */}
            <Grid item xs={12}>
                <TextField
                    label={`${houingTypeString} Name/Title/Address`}
                    type="text"
                    name='title'
                    value={communityHousingDetails.title}
                    onChange={handleChange}
                    inputRef={autocompleteInput}
                    fullWidth
                    required
                    helperText={`Enter the name or title of the ${houingTypeString}.`}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label={`Address`}
                    type="text"
                    name='address'
                    value={communityHousingDetails.address}
                    onChange={handleChange} 
                    fullWidth
                    required
                    helperText={`Enter the address of the ${houingTypeString}.`}
                    InputLabelProps={{
                        shrink: communityHousingDetails && communityHousingDetails.hasOwnProperty('address') && communityHousingDetails.address!==''
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="City" 
                    type="text"
                    name='city'
                    value={communityHousingDetails.city}
                    onChange={handleChange}
                    required
                    helperText={`Enter the city of the ${houingTypeString}.`}
                    InputLabelProps={{
                        shrink: communityHousingDetails && communityHousingDetails.hasOwnProperty('city') && communityHousingDetails.city!==''
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="State"
                    type="text"
                    name='state'
                    value={communityHousingDetails.state}
                    onChange={handleChange}
                    required
                    helperText={`Enter the state of the ${houingTypeString}.`}
                    InputLabelProps={{
                        shrink: communityHousingDetails && communityHousingDetails.hasOwnProperty('state') && communityHousingDetails.state!==''
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Zipcode"
                    type="text"
                    name='postal_code'
                    value={communityHousingDetails.postal_code}
                    onChange={handleChange}
                    required
                    helperText={`Enter the zipcode of the ${houingTypeString}.`}
                    InputLabelProps={{
                        shrink: communityHousingDetails && communityHousingDetails.hasOwnProperty('postal_code') && communityHousingDetails.postal_code!==''
                    }}
                />
            </Grid>
            {/* Community Address */}
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Total Number of Plots"
                    type="number"
                    name='totalPlots'
                    value={communityHousingDetails.totalPlots}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={()=>handleDecrement('totalPlots')} disabled={communityHousingDetails.totalPlots === 0}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={()=>handleIncrement('totalPlots')} disabled={communityHousingDetails.totalPlots === numberFieldParameters.totalPlots.limit}>
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: communityHousingDetails && communityHousingDetails.hasOwnProperty('totalPlots')
                    }}
                    helperText={`Specify the total number of plots in the ${houingTypeString}.`}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Average Rent in $100's"
                    type="number"
                    name="averageRent"
                    value={communityHousingDetails.averageRent}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={()=>handleDecrement('averageRent')} disabled={communityHousingDetails.averageRent === 0}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={()=>handleIncrement('averageRent')} disabled={communityHousingDetails.averageRent === numberFieldParameters.averageRent.limit}>
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: communityHousingDetails && communityHousingDetails.hasOwnProperty('averageRent')
                    }}
                    helperText={`Provide the average rent in the ${houingTypeString}.`}
                />
                {/* <IconButton onClick={handleDecrement} disabled={averageRent === 0}>
                    <RemoveIcon />
                </IconButton>
                <IconButton onClick={handleIncrement} disabled={averageRent === 5}>
                    <AddIcon />
                </IconButton> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={`Describe your ${houingTypeString} and benefits and amenities`}
                minRows={5}
                multiline
                type="text"
                name='communityDescription'
                value={communityHousingDetails.description}
                onChange={handleChange}
                style={{width: '100%'}}
                fullWidth
                helperText={`Explain/Describe the ${houingTypeString}`}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={`${houingTypeString} Website URL `}
                type="url"
                name='websiteURL'
                value={communityHousingDetails.websiteURL}
                onChange={handleChange}
                fullWidth
                helperText={`Enter the website URL for the ${houingTypeString}`}
              />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="amenities-label">Amenities</InputLabel>
                    <Select
                        labelId="amenities-label"
                        multiple
                        value={selectedOptions}
                        onChange={handleCheckboxChange}
                        renderValue={(selected) => selected.join(', ')}
                        InputLabelProps={{
                            shrink: selectedOptions.length!==0
                        }}
                    >
                        {fileContent.map((amenity) => (
                            <MenuItem key={amenity.id} name={amenity.option_value} value={amenity.option_value}>
                                <Checkbox checked={selectedOptions.includes(amenity.option_value)} />
                                {amenity.option_value}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography variant="caption">{`Select the amenities available in the ${houingTypeString}`}</Typography>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" color="secondary" onClick={() => handleSubmit('previous')}>
                    Previous
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" color="primary" onClick={() => handleSubmit('next')} disabled={!communityHousingDetails.title}>
                    Next
                </Button>
            </Grid>
        </Grid>
    );
};

export default CommunityHousing;