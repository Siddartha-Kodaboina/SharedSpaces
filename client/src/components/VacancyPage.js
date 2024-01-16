import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/VacancyPage.css';
import PlaceIcon from '@mui/icons-material/Place';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import HotTubIcon from '@mui/icons-material/HotTub';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import KitchenIcon from '@mui/icons-material/Kitchen';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BathtubIcon from '@mui/icons-material/Bathtub';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import PoolIcon from '@mui/icons-material/Pool';
import AdjustIcon from '@mui/icons-material/Adjust';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ElevatorIcon from '@mui/icons-material/Elevator';
import BathroomIcon from '@mui/icons-material/Bathroom';
import KingBedIcon from '@mui/icons-material/KingBed';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WomanIcon from '@mui/icons-material/Woman';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import SpaIcon from '@mui/icons-material/Spa';

const VacancyPage = () => {
  const { id } = useParams();
  const [requestIdData, setRequestIdData] = useState(null);

  // Fetch community data
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_NODE_HOST_URL}:${process.env.REACT_APP_NODE_HOST_PORT}/api/community/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setRequestIdData(data.content);
      } catch (error) {
        console.error('The error in retrieving community by ID:: ', error);
      }
    };
    fetchCommunityData();
  }, [id]);  // Dependency on id ensures this effect runs when id changes

  // Fetch vacancies based on community title
  useEffect(() => {
    const fetchVacancies = async () => {
      if (requestIdData && requestIdData.community_title) {
        try {
          const params = new URLSearchParams({ 'community_title': requestIdData.community_title }).toString();
          const response = await fetch(`${process.env.REACT_APP_NODE_HOST_URL}:${process.env.REACT_APP_NODE_HOST_PORT}/api/community/?${params}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const data = await response.json();
        //   console.log("Vacancies in the same community ", data);
        } catch (error) {
          console.error('The error in retrieving vacancy by Community Title:: ', error);
        }
      }
    };

    fetchVacancies();
  }, [requestIdData]);  // Dependency on requestIdData ensures this effect runs when requestIdData changes

  return (
    <div className='main'>
        <div className="main-inner">
            <div className="community">
                <div className="community-details">
                    <div className="title">
                        <div className="name-address">
                            <p className="name">{requestIdData && requestIdData.community_title? requestIdData.community_title : ''}</p>
                            <div className="name-address-row-2">
                                <p className="address">{requestIdData && requestIdData.community_title? `${requestIdData.address}, ${requestIdData.city}, ${requestIdData.pincode}`: ''}</p>
                                <div className="location-icon">
                                    <PlaceIcon />{' '}<p>See in map</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="images">
                        <div className="image">

                        </div>
                    </div>
                    <div className="description">
                        <h2 className="description-title">About <span className='element-title-2'>Community</span></h2>
                        <p className='description-content'>San Fernando Apartments offers fully furnished premium accommodations at 
                            affordable prices providing you with spacious rooms, and extremely caring staff who are always 
                            at your service. Our premium accommodations in San Jose cater to the needs of students and 
                            working professionals San Fernando Apartments is located at a walking distance from IT companies 
                            and top-notch colleges. we ensure to take care of all your needs and leave you with all the time in the world to 
                            pursue your interests.
                        </p>
                    </div>
                    <div className="rooms-container">
                        <h2>Available <span className="element-title-2">Rooms</span></h2>
                        <p className="rooms-container-caption-1">All room type have some variants that are larger in size or have extra Amenities.</p>
                        <div className="rooms">
                            <div className="room">
                                <h3>Two Sharing</h3>
                                <p className="room-dates">Starting from</p>
                                <p>24/01/2024--27/02/2024</p>
                            </div>
                            <div className="room">
                                <h3>Two Sharing</h3>
                                <p className="room-dates">Starting from</p>
                                <p>24/01/2024--27/02/2024</p>
                            </div>
                            <div className="room">
                                <h3>Two Sharing</h3>
                                <p className="room-dates">Starting from</p>
                                <p>24/01/2024--27/02/2024</p>
                            </div>
                        </div>
                        <p className="rooms-container-caption-2"><i>*All the prices listed above are exclusive of utilities(water, gas and trash etcetra). </i></p>
                    </div>
                    <div className="amenities-container">
                        <h2>Best <span className='element-title-2'>Amenities</span> </h2>
                        <div className="amenities">
                            <div className="amenity">
                                <LocalParkingIcon />
                                <p>Parking</p>
                            </div>
                            <div className="amenity">
                                <HotTubIcon />
                                <p>Jakuzzi</p>
                            </div>
                            <div className="amenity">
                                <FitnessCenterIcon />
                                <p>Gym</p>
                            </div>
                            <div className="amenity">
                                <KitchenIcon />
                                <p>Refrigirator</p>
                            </div>
                            <div className="amenity">
                                <BatteryChargingFullIcon />
                                <p>Power Backup</p>
                            </div>
                            <div className="amenity">
                                <DoorSlidingIcon />
                                <p>Almirah</p>
                            </div>
                            <div className="amenity">
                                <PoolIcon />
                                <p>Swimming Pool</p>
                            </div>
                            <div className="amenity">
                                <AdjustIcon />
                                <p>CCTV</p>
                            </div>
                            <div className="amenity">
                                <CleaningServicesIcon />
                                <p>House Keeping</p>
                            </div>
                            <div className="amenity">
                                <RecentActorsIcon />
                                <p>Reception</p>
                            </div>
                            <div className="amenity">
                                <BathtubIcon />
                                <p>Bathtub</p>
                            </div>
                            <div className="amenity">
                                <ElevatorIcon />
                                <p>Elevator</p>
                            </div>
                            <div className="amenity">
                                <WaterDropIcon />
                                <p>Water</p>
                            </div>
                            <div className="amenity">
                                <DryCleaningIcon />
                                <p>Dryer</p>
                            </div>
                            <div className="amenity">
                                <BathroomIcon />
                                <p>Bathroom</p>
                            </div>
                            <div className="amenity">
                                <LocalLaundryServiceIcon />
                                <p>Washing</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="universities-container">
                        <h2>Nearby <span className="element-title-2">Universities</span></h2>
                        <div className="universities">
                            <div className="university">
                                <h3 className="uniname">San Jose State university</h3>
                                <p>0.1 M away</p>
                            </div>
                            <div className="university">
                                <h3 className="uniname">Santa Clara University</h3>
                                <p>2.1 M away</p>
                            </div>
                            <div className="university">
                                <h3 className="uniname">Stanford University</h3>
                                <p>10.7 M away</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="active-room">
                    <div className="active-room-inner">
                        <div className="selection-pricing-container">
                            <div className="selection-pricing-container-left">
                                <KingBedIcon />
                                <p>Room Selection, Pricing and Discussion</p>
                            </div>
                            <div className="selection-pricing-container-right">
                                <p>555</p>
                                <MonetizationOnIcon />
                            </div>
                        </div>
                        <div className="room-type">
                            <h4>Room Sharing Type</h4>
                            <div className="room-type-info">
                                <div className="grid-cell">
                                    <LooksTwoIcon />
                                    <p>Two Sharing</p>
                                </div>
                            </div>
                        </div>
                        <div className="tenant-requirements">
                            <h4>Tenant Requirements</h4>
                            <div className="tenant-requirements-list">
                                    <div className="grid-cell">
                                        <WomanIcon style={{color: "rgb(61, 11, 71)"}}/>
                                        <p>Female</p>
                                    </div>
                                    <div className="grid-cell">
                                        <SpaIcon style={{color: "green"}} />
                                        <p>Vegetarian</p>
                                    </div>
                            </div>
                        </div>
                        <div className="discuss-container">
                            <h4>Express Yourself</h4>
                            <div className="discuss-container-inner">
                                <form action="">
                                <textarea
                                    placeholder='Describe and explain your needs, interests, availability and Finance...'
                                    id="user-interest-input"
                                    name="user-interest-input"
                                />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="room-interest">
                        <p>More Information?</p>
                        <p>I'm Interested</p>
                    </div>
                </div>
            </div>
            <div className="suggestions">

            </div>
        </div>
        
    </div>
  );
};

export default VacancyPage;
