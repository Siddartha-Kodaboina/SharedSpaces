import React, {useEffect, useState} from 'react';
import UniversityDetails from './UniversityDetails';
import NearestUniversities from './NearestUniversities';
import IndividualOrCommunity from './IndividualOrCommunity';
import CommunityHousing from './CommunityHousing';
import RoomInput from './RoomInput';
import useFirebaseUser from '../../hooks/useFirebaseUser';

const CreateVacancyFlow = () => {
    const currentUser = useFirebaseUser();
    const [pageNumber, setPageNumber] = useState(1);
    const totalPages = 5;
    const [formContent, setFormContent] = useState({
        'universityDetails': {},
        'nearesrestUniversityDetails': [{universityName: '', distance: ''}],
        'housingType': '',
        'communityDetails': {},
        'roomDetails': {}
    });

    const renderFormContent = () => {
        switch(pageNumber){
            case 1:
                return <UniversityDetails
                    onPrev = {handlePreviousButton}
                    onNext={handleNextButton}
                    onPageSubmit = {onFormPageSubmit}
                    formContent = {formContent}
                />;  // 1. Univeristy you attend
            case 2:
                return <NearestUniversities 
                    onPrev = {handlePreviousButton}
                    onNext={handleNextButton}
                    onPageSubmit = {onFormPageSubmit}
                    nearesrestUniversityDetails = {formContent['nearesrestUniversityDetails']}
                /> // 2. Nearest Univerisities
            case 3:
                return <IndividualOrCommunity 
                    onPrev = {handlePreviousButton}
                    onNext={handleNextButton}
                    onPageSubmit = {onFormPageSubmit}
                    housingType = {formContent['housingType']}
                />  // 3. Get the community type
            case 4:
                return <CommunityHousing 
                    onPrev = {handlePreviousButton}
                    onNext={handleNextButton}
                    onPageSubmit = {onFormPageSubmit}
                    communityDetails = {formContent['communityDetails']}
                    housingType = {formContent['housingType']}
                />  // 4. Get the community/property details
            case 5:
                return <RoomInput 
                    onPrev = {handlePreviousButton}
                    onNext={handleNextButton}
                    onPageSubmit = {onFormPageSubmit}
                    onFormSubmit = {handleFormSubmit}
                    roomDetails = {formContent['roomDetails']}
                />  // 5. Get the room specific details
            default:
                return <div>Default Page Content</div>;
        }
    }

    useEffect( () => {
        renderFormContent();
        
    }, [pageNumber]);

    const onFormPageSubmit = (key, value) => {
        setFormContent({...formContent, [key]: value});
    }

    const handlePreviousButton = (e, step=1) => {
        // e.preventDefault();
        if (pageNumber <= step){
            return;
        }
        setPageNumber(pageNumber - step);
    }

    const handleNextButton = (e, step=1) => {
        // e.preventDefault();
        if (pageNumber > totalPages-step){
            return;
        }
        setPageNumber(pageNumber +step);
        
    }

    const handleFormSubmit = async() => {
        try {
            
            const body = {
                ...formContent,
                user: currentUser
            };
            console.log("Body: ", body);

            const response = await fetch(`${process.env.REACT_APP_NODE_HOST_URL}:${process.env.REACT_APP_NODE_HOST_PORT}/api/vacancy-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(response => console.log("The responce", response));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Handle the form submit button , call backed to the right API end-point

    return (
        <div className='main'>
            <div className="main-inner">
                <div className="top-title">
                    <h2>Create Your Request</h2>
                    <p>you're on page {pageNumber}/{totalPages}</p>
                </div>
                <div className="form-content">
                    {renderFormContent()}
                </div>
            </div>
        </div>
    );
}

export default CreateVacancyFlow;