import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button, Typography, Grid } from '@mui/material';

const IndividualOrCommunity = ({ onPrev, onNext, onPageSubmit, housingType }) => {
    const [selectedOption, setSelectedOption] = useState(housingType);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (buttonName) => {
        onPageSubmit('housingType', selectedOption);
        buttonName === 'next' ? onNext() : onPrev();
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    Is your house/home/plot an individual house or a community plot?
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <RadioGroup
                        name="housingType"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <FormControlLabel
                            value="individual"
                            control={<Radio />}
                            label="Individual Housing"
                        />
                        <FormControlLabel
                            value="community"
                            control={<Radio />}
                            label="Community Housing"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => handleSubmit('previous')}
                >
                    Previous
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={selectedOption === ''}
                    onClick={() => handleSubmit('next')}
                >
                    Next
                </Button>
            </Grid>
        </Grid>
    );
};

export default IndividualOrCommunity;
