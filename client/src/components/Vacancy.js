import React from 'react';
import '../styles/Vacancy.css';

const Vacancy = ({data}) => {
    // console.log(data);
  return (
    <div className='vacancy'>
        <div className="vacancy-top-row">
            <p>{data.community_title}</p>
            <p>Availability: data.from_data -- data.to_data</p>
        </div>
        <div className="vacancy-bottom-row">
            <p>{data.address}, {data.city}, {data.state_code}, {data.country_code}</p>
            <p>Rent: {data.avg_rent}</p>
        </div>
    </div>
  );
}

export default Vacancy;