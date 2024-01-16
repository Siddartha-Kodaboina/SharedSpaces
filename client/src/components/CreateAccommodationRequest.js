import React, {useState} from 'react';
import useUser from '../hooks/useFirebaseUser';

const CreateAccommodationRequest = () => {
  const user = useUser();
  const [requestValues, setRequestValues] = useState({
    city: "",
    address: "",
    state: "",
    country: "",
    pincode: "",
    community_title: "",
    from: "",
    to: "",
    rent: "",
    ...user
  });

  const handleChange = (e) =>{
    setRequestValues({...requestValues, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(requestValues);
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="city"
          placeholder="City"
          value = {requestValues.city}
          onChange = {handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateAccommodationRequest;