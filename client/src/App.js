import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import CreateAccommodation from './components/CreateAccommodation';
import Settings from './components/Settings';
import Login from './components/SignInComponent';
import useUser from './hooks/useFirebaseUser';

import './App.css';
import CreateAccommodationRequest from './components/CreateAccommodationRequest';
import Create from './components/Create';
import VacancyPage from './components/VacancyPage';
import CreateVacancyFlow  from './components/create-vacancy-flow/CreateVacancyFlow';

const App = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_FIREBASE_API_KEY}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const currentUser = useUser();

  return (
    <Router className="app">
      <NavigationBar />
      <Routes>
        <Route path="/" element={currentUser ? <Home user={currentUser}/> : <Navigate replace to="/login" />} />
        <Route path="/create" element={currentUser ? <Create /> : <Navigate replace to="/login" />} />
        <Route path="/create-accommodation" element={currentUser ? <CreateAccommodation /> : <Navigate replace to="/login" />} />
        <Route path="/create-accommodation-request" element={currentUser ? <CreateAccommodationRequest /> : <Navigate replace to="/login" />} />
        <Route path="/create-accommodation-request-workflow" element={currentUser ? <CreateVacancyFlow /> : <Navigate replace to="/login" />} />
        <Route path="/settings" element={currentUser ? <Settings /> : <Navigate replace to="/login" />} />
        <Route path="/vacancy/:id" element={currentUser ? <VacancyPage/> : <Navigate replace to="/login" />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
