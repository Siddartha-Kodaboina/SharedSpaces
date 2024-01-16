import React, { useState, useEffect, useRef } from 'react';
import Address from './inputComponents/Address';
import Pincode from './inputComponents/Pincode';
import useUser from '../hooks/useFirebaseUser';
// import AutoCompleteInput from './AutoCompleteInput';
import {generateAddress} from './create-vacancy-flow/utilities';


const CreateAccommodation = () => {
  const user = useUser();
  const autocompleteInput = useRef(null);
  let autocomplete = null;
  const [communityDetails, setCommunityDetails] = useState({
    community_title: '',
    country: '',
    country_code: '',
    address: '',
    city: '',
    state: '',
    state_code: '',
    pincode: '',
    rating: '',
    avg_rent: '',
    location_link: '',
    website_link: '',
    description: '',
    from_date: '',
    to_date: ''
  });

  useEffect(() => {
    autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteInput.current,
        {
            componentRestrictions: { country: "us" },
            fields: ["address_components", "name", "photos"],
            types:["establishment"]
        }
    );

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        // Handle the selected place
        console.log(place);
        let updatedCommunityDetails = {
          ...communityDetails,
          ...generateAddress(place.address_components),
          community_title: place.name
        }
        console.log("after prevCommunityDetails", communityDetails); 
        for(let i=0; i<place.photos.length; i++){
          console.log(`place photo ${i} ${place.photos[i].getUrl()}`);
        }
        
        setCommunityDetails(updatedCommunityDetails);
    });
  }, [communityDetails]);

  const [amenities, setAmenities] = useState({
    pool: false,
    gym: false,
    cctv: false,
  });

  const handleCheckboxChange = (e) => {
    setAmenities({ ...amenities, [e.target.name]: e.target.checked });
  };

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
      <label>
        <p>Community Address <span>*</span></p> 
        <input
          name="address"
          placeholder="Enter Community Address"
          style = {{width: "500px"}}
          ref={autocompleteInput} 
          type="text" 
          required
        />
      </label>
      
      <label htmlFor="">
        <p>
          Community title
        </p>
        <input
          name="community_title"
          type="text"
          placeholder="Enter Community Title"
          value={communityDetails.community_title}
          onChange={handleChange}
        />
      </label>
      
      <label htmlFor="">
        <p>
          City
        </p>
        <input
          name="city"
          type="text"
          placeholder="City"
          value={communityDetails.city}
          onChange={handleChange}
        />
      </label>
      
      <label htmlFor="">
        <p>
          State
        </p>
        <input
          name="state"
          type="text"
          placeholder="State"
          value={communityDetails.state}
          onChange={handleChange}
        />
      </label>
      
      <label htmlFor="">
        <p>
          Country
        </p>
        <input
          name="country"
          type="text"
          placeholder="Country"
          value={communityDetails.country}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="">
        <p>
          Location Link
        </p>
        <input
          name="location_link"
          type="text"
          placeholder="Location Link"
          value={communityDetails.location_link}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="">
        <p>
          Website Link
        </p>
        <input
          name="website_link"
          type="text"
          placeholder="Website Link"
          value={communityDetails.website_link}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="">
        <p>
          Description
        </p>
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={communityDetails.description}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="">
        <p>
          Rating
        </p>
        <input
          name="rating"
          type="number"
          placeholder="rating"
          value={communityDetails.rating}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="">
        <p>
          Average Rent
        </p>
        <input
          name="avg_rent"
          type="number"
          placeholder="Average Rent / Month"
          value={communityDetails.avg_rent}
          onChange={handleChange}
          required
        />
      </label>
      
      <label>
        <p>
          Pool
        </p>
        <input
          name="pool"
          type="checkbox"
          checked={amenities.pool}
          onChange={handleCheckboxChange}
        />
        {' '}Pool
      </label>

      <label>
        <p>
          Gym
        </p>
        <input
          name="gym"
          type="checkbox"
          checked={amenities.gym}
          onChange={handleCheckboxChange}
        />
        {' '}Gym
      </label>

      <label>
        <p>
          CCTV
        </p>
        <input
          name="cctv"
          type="checkbox"
          checked={amenities.cctv}
          onChange={handleCheckboxChange}
        />
        {' '}CCTV
      </label>
      <label>
        <p>Earliest Available Date</p>
        <input 
          type="date"
          name="from_date"
          id="from_date"
          value={communityDetails.from_date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        <p>Last Available Date</p>
        <input 
          type="date"
          name="to_date"
          id="to_date"
          value={communityDetails.to_date}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateAccommodation;
