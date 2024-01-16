import React from 'react';
import { NavLink } from 'react-router-dom';
import Vacancy from './Vacancy';
import '../styles/NavigationBar.css';
const VacancyContainer = (vacancies) => {
    // console.log("vacancies", vacancies);
    return (
        <div style={{marginTop: "10px"}}>
            {
                vacancies.data.slice().reverse().map(vacancy => (
                    <NavLink 
                        style={{textDecoration: 'none', cursor: 'pointer'}}
                        key={vacancy.community_id} 
                        to={`/vacancy/${vacancy.community_id}`}
                        activeClassName="active">
                        <Vacancy data={vacancy} />
                    </NavLink>
                ))
            }
        </div>
    );
}

export default VacancyContainer;