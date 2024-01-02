// import { useState, useEffect } from 'react';

// import Login from './components/SignInComponent';
// import Home from './components/Home';
// import {auth} from './config/firebaseConfig';

// import './App.css';



// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     auth.onAuthStateChanged(user => {
//       setUser(user);
//     })
//   }, [])

//   console.log(user);

//   return (
//     <div className="app">
//       {user ? <Home user={user}/> : <Login />}
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import CreateAccommodation from './components/CreateAccommodation';
import Settings from './components/Settings';
import Login from './components/SignInComponent';
import useUser from './hooks/useFirebaseUser';

import './App.css';

const App = () => {
  const currentUser = useUser();

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={currentUser ? <Home user={currentUser}/> : <Navigate replace to="/login" />} />
        <Route path="/create-accommodation" element={currentUser ? <CreateAccommodation /> : <Navigate replace to="/login" />} />
        <Route path="/settings" element={currentUser ? <Settings /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
