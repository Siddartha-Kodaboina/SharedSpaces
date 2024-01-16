import React, { useState } from 'react';
import { TextField, Button, Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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

const NearestUniversities = ({ onPrev, onNext, onPageSubmit, nearesrestUniversityDetails }) => {
  const [universities, setUniversities] = useState(nearesrestUniversityDetails);

  const handleUniversityChange = (index, e) => {
    const newUniversities = [...universities];
    newUniversities[index][e.target.name] = e.target.value;
    setUniversities(newUniversities);
  };

  const addUniversity = () => {
    setUniversities([...universities, { universityName: '', distance: '' }]);
  };

  const handleSubmit = (buttonName) => {
    // e.preventDefault();
    onPageSubmit('nearesrestUniversityDetails', universities);
    buttonName === 'next' ?  onNext(): onPrev();
  };

  return (
    <Grid container spacing={2}>
      {universities.map((uni, index) => (
        <React.Fragment key={index}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label={`Nearest University Name ${index+1}`}
              type="text"
              name="universityName"
              value={uni.universityName}
              onChange={(e) => handleUniversityChange(index, e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Distance"
              type="text"
              name="distance"
              value={uni.distance}
              onChange={(e) => handleUniversityChange(index, e)}
              fullWidth
            />
          </Grid>
        </React.Fragment>
      ))}
      <Grid item xs={12}>
        <IconButton
          onClick={addUniversity}
            disabled={universities.length === 5}
            color="primary"
        >
            <AddCircleOutlineIcon /> Add Another University
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton
            variant="contained"
            name='previous'
            color="secondary"
            onClick={()=>handleSubmit('previous')}
            >
        Previous
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton
            variant="contained"
            name='next'
            color="primary"
            onClick={()=>handleSubmit('next')}
            >
            Next
        </StyledButton>
      </Grid>
    </Grid>
  );
};

export default NearestUniversities;
