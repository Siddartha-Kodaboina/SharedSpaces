import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavigationBar.css'; // This is where the styles will be imported from
// import useUser from '../hooks/useUser';

const NavigationBar = () => {
//   const currentUser = useUser();
  return (
    <nav className="navigation-bar">
      <div className="left-tabs">
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/create-accommodation" activeClassName="active">Create Accommodation</NavLink>
        <NavLink to="/settings" activeClassName="active">Settings</NavLink>
      </div>
      <div className="title-logo-right">
        <h1>Your App Title</h1>
        {/* Replace with your logo */}
        {/* <img src="logo.png" alt="App Logo" /> */}
      </div>
    </nav>
  );
};

export default NavigationBar;
