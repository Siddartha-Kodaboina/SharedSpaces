import React, {useState, useEffect} from 'react';
import { auth } from '../config/firebaseConfig';
import '../App.css';
import VacancyContainer from './VacancyContainer';


const Home = ({ user }) => {
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    const fetchData = async ()=>{
      try {
        const responce = await fetch(`${process.env.REACT_APP_NODE_HOST_URL}:${process.env.REACT_APP_NODE_HOST_PORT}/api/community`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(response => setRequests(response));
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, [] ); 
  
  return (
    <div className="home">
      {console.log(requests)}
      {/* {
        requests===null? 'Loading...': 
        <VacancyContainer data={requests.content}/>
      } */}
      <p>You're home</p>
    </div>
  )
}

export default Home;

