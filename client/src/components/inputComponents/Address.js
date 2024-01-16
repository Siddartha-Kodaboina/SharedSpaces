import React, { useState, useEffect } from 'react';
// import GeocoderAutocomplete from '@geoapify/geocoder-autocomplete';

const Address = ({setCityAddress}) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [typing, setTyping] = useState(false);

    useEffect( () => {
        const delayDebounce = setTimeout(async() => {
            if (typing && inputValue.length >= 3) {
                // Fetch suggestions
                // https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(inputValue)}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}&limit=20&filter[countrycode]=us
                
                await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(inputValue)}&types=establishment&components=country:us&key=${process.env.REACT_APP_FIREBASE_API_KEY}`)
                    .then(response => response.json())
                    .then(data => setSuggestions(data.predictions));
                console.log("Address suggestions", suggestions)
            } else {
                setSuggestions([]);
            }
        }, 50);

        return () => clearTimeout(delayDebounce);
    }, [inputValue]);

    const handleSelect = (suggestion) => {
        setInputValue(suggestion.properties.formatted);
        setCityAddress(suggestion.properties.formatted, suggestion.properties.country, suggestion.properties.country_code, suggestion.properties.state, suggestion.properties.state_code, suggestion.properties.city);
        setSuggestions([]);
        setTyping(false);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setTyping(true);
    }

    return (
        <div>
            <input 
                type="text" 
                // style = {{width: '300px', marginBottom: '100px'}}
                value={inputValue} 
                onChange={handleChange}
                placeholder="Enter City/County"
            />
            {suggestions.length > 0 && (
                <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                    {suggestions.map(suggestion => (
                        <div key={suggestion.place_id} onClick={() => handleSelect(suggestion)}>
                            {suggestion.description}
                        </div>
                    ))}
                    {console.log(suggestions)}
                </div>
            )}
        </div>
    );
};

export default Address;
