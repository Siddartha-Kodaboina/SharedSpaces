import React, { useState } from 'react';
import Address from './inputComponents/Address';
import Pincode from './inputComponents/Pincode';
import useUser from '../hooks/useFirebaseUser';

const CreateAccommodation = () => {
  const user = useUser();

  const [communityDetails, setCommunityDetails] = useState({
    community_title: '',
    country: '',
    country_code: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    rating: '',
    avg_rent: '',
    location_link: '',
    website_link: '',
    description: ''
  });

  const [amenities, setAmenities] = useState({
    pool: false,
    gym: false,
    cctv: false,
  });

  const handleCheckboxChange = (e) => {
    setAmenities({ ...amenities, [e.target.name]: e.target.checked });
  };

//   const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
//   const [state, setState] = useState('');
  const [stateCode, setStateCode] = useState('');
//   const [city, setCity] = useState('');

  const setCityAddress = (address, country, countryCode, state, stateCode, city) => {
    // setCountry(country);
    // setCommunityDetails({ ...communityDetails, 'country': country});
    setCountryCode(countryCode);
    // setState(state);
    // setCommunityDetails({ ...communityDetails, 'state': state});
    setStateCode(stateCode);
    // setCity(city);
    setCommunityDetails({ ...communityDetails, 'address': address, 'city': city, 'state': state, 'country': country});
    console.log(country);
  }

  const setPincode = (pincode) => setCommunityDetails({ ...communityDetails, 'pincode':pincode});

  const handleChange = (e) => {
    setCommunityDetails({ ...communityDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        ...communityDetails,
        ...amenities,
        'creator_uuid': user.uid
    };

    console.log("formData", formData);
    console.log("dataToSend", formData);

    try {
        const response = await fetch(`${process.env.REACT_APP_NODE_HOST_URL}:${process.env.REACT_APP_NODE_HOST_PORT}/api/community`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          console.log('Data saved successfully');
        } else {
          console.error('Failed to save data');
        }
      } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <Address setCityAddress={setCityAddress}/>
    
      <input
        name="community_title"
        type="text"
        placeholder="Enter Community Title"
        value={communityDetails.community_title}
        onChange={handleChange}
        required
      />
      <input
        name="city"
        type="text"
        placeholder="City"
        value={communityDetails.city}
        onChange={handleChange}
        required
      />
      <input
        name="state"
        type="text"
        placeholder="State"
        value={communityDetails.state}
        onChange={handleChange}
        required
      />
      <input
        name="country"
        type="text"
        placeholder="Country"
        value={communityDetails.country}
        onChange={handleChange}
        required
      />
      <input
        name="location_link"
        type="text"
        placeholder="Location Link"
        value={communityDetails.location_link}
        onChange={handleChange}
        required
      />
      <Pincode state_code={stateCode} city={communityDetails.city} setPincode={setPincode}/>
      <input
        name="website_link"
        type="text"
        placeholder="Website Link"
        value={communityDetails.website_link}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        type="text"
        placeholder="Description"
        value={communityDetails.description}
        onChange={handleChange}
        required
      />
      <input
        name="rating"
        type="number"
        placeholder="rating"
        value={communityDetails.rating}
        onChange={handleChange}
        required
      />
      <input
        name="avg_rent"
        type="number"
        placeholder="Average Rent / Month"
        value={communityDetails.avg_rent}
        onChange={handleChange}
        required
      />
      <label>
        <input
          name="pool"
          type="checkbox"
          checked={amenities.pool}
          onChange={handleCheckboxChange}
        />
        {' '}Pool
      </label>

      <label>
        <input
          name="gym"
          type="checkbox"
          checked={amenities.gym}
          onChange={handleCheckboxChange}
        />
        {' '}Gym
      </label>

      <label>
        <input
          name="cctv"
          type="checkbox"
          checked={amenities.cctv}
          onChange={handleCheckboxChange}
        />
        {' '}CCTV
      </label>

      
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateAccommodation;
