import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';
import '../styles/NavigationBar.css';
import useUser from '../hooks/useFirebaseUser';
// import CreateVacancyFlow  from './create-vacancy-flow/CreateVacancyFlow';

const NavigationBar = () => {
  const currentUser = useUser();
  return (
    <nav className="navigation-bar">
      <div className="title-logo-left">
        <h1>Your App Title</h1>
        {/* Replace with your logo */}
        {/* <img src="logo.png" alt="App Logo" /> */}
      </div>
      <div className="right-tabs">
        <ul className='ul-1'>
            <li>
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
            </li>
            <li>
                <NavLink to="/create" activeClassName="active">Create</NavLink>
                <ul className='ul-2'>
                    <li>
                        <NavLink to="/create-accommodation" activeClassName="active" style={{color: "green"}}>Create Accommodation</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create-accommodation-request" activeClassName="active">Create Accommodation Request</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create-accommodation-request-workflow" activeClassName="active">Create Request Workflow</NavLink>
                    </li>
                </ul>
            </li>
            <li>
                <NavLink to="/settings" activeClassName="active">Settings</NavLink>
            </li>
            {currentUser ?
              <li>
              <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
              
            </li>: ''}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
