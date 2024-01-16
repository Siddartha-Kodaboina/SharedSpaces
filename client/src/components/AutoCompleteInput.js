import React, {useRef, useEffect, useState} from 'react';

const AutoCompleteInput = () => {
    const autocompleteInput = useRef(null);
    let autocomplete = null;
    const [communityDetails, setCommunityDetails] = useState({
        community_title: '',
        country: '',
        country_code: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        rating: '',
        avg_rent: '',
        location_link: '',
        website_link: '',
        description: ''
    });

    useEffect(() => {
        autocomplete = new window.google.maps.places.Autocomplete(
            autocompleteInput.current,
            {
                componentRestrictions: { country: "us" },
                fields: ["address_components", "name"],
                types:["establishment"]
            }
        );

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            // Handle the selected place
            console.log(place);
        });
    }, []);

  return <input
    style = {{width: "500px"}}
    ref={autocompleteInput} 
    type="text" />;
}

export default AutoCompleteInput;