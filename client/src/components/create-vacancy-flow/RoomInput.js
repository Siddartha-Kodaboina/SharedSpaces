import React, {useState, useEffect} from 'react';
import {
    Grid, Typography, TextField, InputAdornment, IconButton,FormControl,
    InputLabel, Select, MenuItem, Checkbox, Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {numberFieldParameters, numberFieldsInText} from './utilities';

const RoomInput = ({onPrev, onNext, onPageSubmit, onFormSubmit, roomDetails }) => {
    const [roomHousingDetails, setRoomHousingDetails] = useState(roomDetails);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedDo, setSelectedDo] = useState([]);
    const [selectedDont, setSelectedDont] = useState([]);
    const [selectedTenantRequirements, setSelectedTenantRequirements] = useState([]);
    const [roomAmenities, setRoomAmenities] = useState([]);
    const [roomDo, setRoomDo] = useState([]);
    const [roomDont, setRoomDont] = useState([]);
    const [tenantRequirements, setTenantRequirements] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        let newValue = value;
        if(numberFieldParameters.hasOwnProperty(name)) {
            newValue = Math.max(0, Math.min(numberFieldParameters[name].limit, Number(e.target.value)));
        }
        if(numberFieldsInText.includes(name)){
            newValue = newValue.replace(/[^0-9]/g, '');
        }
        setRoomHousingDetails({ ...roomHousingDetails, [name]: newValue });
    };

    const handleIncrement = (key) => {
        if (!roomHousingDetails.hasOwnProperty(key) || roomHousingDetails[key] < numberFieldParameters[key].limit) {
            setRoomHousingDetails(prevDetails => ({
                ...prevDetails,
                [key]: prevDetails.hasOwnProperty(key)? prevDetails[key] + numberFieldParameters[key].step:  numberFieldParameters[key].step
            }));
        }
    };

    useEffect(() => {
        const filePaths = [
          './room-amenities-options.txt',
          './room-do.txt',
          './room-dont.txt',
          './tenant-requirements.txt'
        ];
      
        Promise.all(filePaths.map(filePath =>
          fetch(filePath).then(response => response.text())
        ))
        .then(filesContent => {
          const combinedData = filesContent.map((fileContent, fileIndex) => {
            return fileContent.split('\n').map((line, index) => ({
              id: fileIndex * 1000 + index + 1, // Unique ID, assuming each file has less than 1000 lines
              option_value: line
            }));
          });
      
          // Flatten the array of arrays to get a single array containing all files' content
        //   const flatData = combinedData.flat();
      
          // Now, set the state with this combined data from all files
          setRoomAmenities(combinedData[0]);
          setRoomDo(combinedData[1]);
          setRoomDont(combinedData[2]);
          setTenantRequirements(combinedData[3]);
        })
        .catch(error => {
          console.error('Error fetching the text files: ', error);
        });
    }, []);

    const handleCheckboxChange = (eventTargetValue, selectTypeStringLabel) => {
        if(selectTypeStringLabel === 'room-amenities'){
            setSelectedAmenities(eventTargetValue);
        }
        if(selectTypeStringLabel === 'room-do'){
            setSelectedDo(eventTargetValue);
        }
        if(selectTypeStringLabel === 'room-dont'){
            setSelectedDont(eventTargetValue);
        }
        if(selectTypeStringLabel === 'tenant-requirements'){
            setSelectedTenantRequirements(eventTargetValue);
        }
        // setSelectedOptions(event.target.value);
    };

    const handleSubmit = (buttonName) => {
        onPageSubmit('roomDetails', roomHousingDetails);
        buttonName === 'submit' ? onFormSubmit() : onPrev();
    };
      
    const handleDecrement = (key) => {
        if (roomHousingDetails[key] > 0) {
            setRoomHousingDetails(prevDetails => ({
                ...prevDetails,
                [key]: prevDetails[key] -  numberFieldParameters[key].step
            }));
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Room Specific Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Total Number of BedRooms"
                    type="number"
                    name='totalBedRooms'
                    value={roomHousingDetails.hasOwnProperty('totalBedRooms')? roomHousingDetails.totalBedRooms: ''}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={()=>handleDecrement('totalBedRooms')} disabled={roomHousingDetails.totalBedRooms === 0}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={()=>handleIncrement('totalBedRooms')} disabled={roomHousingDetails.totalBedRooms === numberFieldParameters.totalBedRooms.limit}>
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: roomHousingDetails && roomHousingDetails.hasOwnProperty('totalBedRooms')
                    }}
                    helperText={`Specify the total number of bedrooms.`}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Total Number of Bath Rooms"
                    type="number"
                    name='bathRooms'
                    value={roomHousingDetails.hasOwnProperty('bathRooms')? roomHousingDetails.bathRooms: ''}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={()=>handleDecrement('bathRooms')} disabled={roomHousingDetails.bathRooms === 0}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={()=>handleIncrement('bathRooms')} disabled={roomHousingDetails.bathRooms === numberFieldParameters.bathRooms.limit}>
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: roomHousingDetails && roomHousingDetails.hasOwnProperty('bathRooms')
                    }}
                    helperText={`Specify the total number of bathrooms.`}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="tenant-requirements-label">Tenant Requirements</InputLabel>
                    <Select
                        labelId="tenant-requirements"
                        multiple
                        value={selectedTenantRequirements}
                        onChange={(e)=>handleCheckboxChange(e.target.value, 'tenant-requirements')}
                        renderValue={(selected) => selected.join(', ')}
                        InputLabelProps={{
                            shrink: selectedTenantRequirements.length!==0
                        }}
                    >
                        {tenantRequirements.map((requirement) => (
                            <MenuItem key={requirement.id} name={requirement.option_value} value={requirement.option_value}>
                                <Checkbox checked={selectedTenantRequirements.includes(requirement.option_value)} />
                                {requirement.option_value}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography variant="caption">{`Select the Tenant's Requirements.`}</Typography>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Number of male adults"
                    type="number"
                    name='maleCount'
                    value={roomHousingDetails.hasOwnProperty('maleCount')? roomHousingDetails.maleCount: ''}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={()=>handleDecrement('maleCount')} disabled={roomHousingDetails.maleCount === 0}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={()=>handleIncrement('maleCount')} disabled={roomHousingDetails.maleCount === numberFieldParameters.maleCount.limit}>
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: roomHousingDetails && roomHousingDetails.hasOwnProperty('maleCount')
                    }}
                    helperText={`Total number of male adults living in house.`}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Number of female adults"
                    type="number"
                    name='femaleCount'
                    value={roomHousingDetails.hasOwnProperty('femaleCount')? roomHousingDetails.femaleCount: ''}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={()=>handleDecrement('femaleCount')} disabled={roomHousingDetails.femaleCount === 0}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={()=>handleIncrement('femaleCount')} disabled={roomHousingDetails.femaleCount === numberFieldParameters.femaleCount.limit}>
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: roomHousingDetails && roomHousingDetails.hasOwnProperty('femaleCount')
                    }}
                    helperText={`Total number of female adults living in house.`}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Number of children"
                    type="number"
                    name='childrenCount'
                    value={roomHousingDetails.hasOwnProperty('childrenCount')? roomHousingDetails.childrenCount: ''}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={()=>handleDecrement('childrenCount')} disabled={roomHousingDetails.childrenCount === 0}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={()=>handleIncrement('childrenCount')} disabled={roomHousingDetails.childrenCount === numberFieldParameters.childrenCount.limit}>
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: roomHousingDetails && roomHousingDetails.hasOwnProperty('childrenCount')
                    }}
                    helperText={`Total number of children living in house.`}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Enter Sharing Type"
                    type="number"
                    name='sharingType'
                    value={roomHousingDetails.hasOwnProperty('sharingType')? roomHousingDetails.sharingType: ''}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={()=>handleDecrement('sharingType')} disabled={roomHousingDetails.sharingType === 0}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={()=>handleIncrement('sharingType')} disabled={roomHousingDetails.sharingType === numberFieldParameters.sharingType.limit}>
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: roomHousingDetails && roomHousingDetails.hasOwnProperty('sharingType')
                    }}
                    helperText={`Enter sharing Type. Eg., 2 means 2 people will live in same room`}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Enter monthly Rent"
                    type="text"
                    name='monthlyRent'
                    value={roomHousingDetails.monthlyRent}
                    onChange={handleChange}
                    fullWidth
                    helperText={`Enter rent only digits, NO special characters and NO alphabets`}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Enter distance to university in Miles"
                    type="number"
                    name='roomUniversityDistance'
                    value={roomHousingDetails.hasOwnProperty('roomUniversityDistance')? roomHousingDetails.roomUniversityDistance: ''}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={()=>handleDecrement('roomUniversityDistance')} disabled={roomHousingDetails.roomUniversityDistance === 0}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={()=>handleIncrement('roomUniversityDistance')} disabled={roomHousingDetails.roomUniversityDistance === numberFieldParameters.roomUniversityDistance.limit}>
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: roomHousingDetails && roomHousingDetails.hasOwnProperty('roomUniversityDistance')
                    }}
                    helperText={`Enter distance from room to university.`}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Enter travel mode to university"
                    type="text"
                    name='roomToUniversityTravelMode'
                    value={roomHousingDetails.roomToUniversityTravelMode}
                    onChange={handleChange}
                    fullWidth
                    helperText={`Enter room to university mode of transportation`}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="room-amenities-label">Room Specific Amenities</InputLabel>
                    <Select
                        labelId="room-amenities"
                        multiple
                        value={selectedAmenities}
                        onChange={(e)=>handleCheckboxChange(e.target.value, 'room-amenities')}
                        renderValue={(selected) => selected.join(', ')}
                        InputLabelProps={{
                            shrink: selectedAmenities.length!==0
                        }}
                    >
                        {roomAmenities.map((amenity) => (
                            <MenuItem key={amenity.id} name={amenity.option_value} value={amenity.option_value}>
                                <Checkbox checked={selectedAmenities.includes(amenity.option_value)} />
                                {amenity.option_value}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography variant="caption">{`Select the amenities available in the room.`}</Typography>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="room-do-label">Room Specific Do's</InputLabel>
                    <Select
                        labelId="room-do"
                        multiple
                        value={selectedDo}
                        onChange={(e)=>handleCheckboxChange(e.target.value, 'room-do')}
                        renderValue={(selected) => selected.join(', ')}
                        InputLabelProps={{
                            shrink: selectedDo.length!==0
                        }}
                    >
                        {roomDo.map((amenity) => (
                            <MenuItem key={amenity.id} name={amenity.option_value} value={amenity.option_value}>
                                <Checkbox checked={selectedDo.includes(amenity.option_value)} />
                                {amenity.option_value}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography variant="caption">{`Select the Do's in the room.`}</Typography>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="room-dont-label">Room Specific Dont's</InputLabel>
                    <Select
                        labelId="room-dont"
                        multiple
                        value={selectedDont}
                        onChange={(e)=>handleCheckboxChange(e.target.value, 'room-dont')}
                        renderValue={(selected) => selected.join(', ')}
                        InputLabelProps={{
                            shrink: selectedDont.length!==0
                        }}
                    >
                        {roomDont.map((amenity) => (
                            <MenuItem key={amenity.id} name={amenity.option_value} value={amenity.option_value}>
                                <Checkbox checked={selectedDont.includes(amenity.option_value)} />
                                {amenity.option_value}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography variant="caption">{`Select the Dont's in the room.`}</Typography>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={`Describe your Room and benefits and amenities`}
                minRows={5}
                multiline
                type="text"
                name='roomDescription'
                value={roomHousingDetails.description}
                onChange={handleChange}
                style={{width: '100%'}}
                fullWidth
                helperText={`Explain/Describe the Room`}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" color="secondary" onClick={() => handleSubmit('previous')}>
                    Previous
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" color="primary" onClick={() => handleSubmit('submit')} >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
}

export default RoomInput;