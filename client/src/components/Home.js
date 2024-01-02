import React from 'react';
import { auth } from '../config/firebaseConfig';
import '../App.css';

const Home = ({ user }) => {
  return (
    <div className="home">
      <h1>Hello, <span></span>{user.displayName}</h1>
      <img src={user.photoURL} alt="" />
      <h1>{process.env.REACT_APP_FIREBASE_API_KEY}</h1>
      <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
    </div>
  )
}

export default Home;

