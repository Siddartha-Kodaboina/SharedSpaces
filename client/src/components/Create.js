import React from 'react';
import CreateAccommodation from './CreateAccommodation';
import CreateAccommodationRequest from './CreateAccommodationRequest';
import { NavLink } from 'react-router-dom';

const Create = () => {
  return (
    <div>     
        <NavLink to="/create-accommodation" activeClassName="active" style={{color: "green"}}>Create Accommodation</NavLink>
        <NavLink to="/create-accommodation-request" activeClassName="active">Create Accommodation Request</NavLink>
    </div>
    
  );
}

export default Create;