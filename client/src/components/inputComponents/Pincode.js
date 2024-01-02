import React, { useState, useEffect } from 'react';

const Pincode = ({state_code, city, setPincode}) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        fetchSuggestions(200);
    }, [inputValue]);


    const fetchSuggestions = async (wait_time) => {
        console.log('Fetching suggestions');
        const delayDebounce = setTimeout(() => {
            console.log("Before time out: " + wait_time);
            // if (typing && inputValue.length != 5) {
                const apiUrl = `https://api.api-ninjas.com/v1/zipcode?city=${encodeURIComponent(city)}&state=${state_code}`;
                console.log('state_code', state_code, ': city', city);
                console.log(apiUrl);
                fetch(apiUrl, {
                        method: 'GET',
                        headers: {
                            'X-Api-Key': process.env.REACT_APP_NINJAS_PINCODE_API_KEY,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Process the data as needed
                        console.log("Pin code data", data);
                        const filteredSuggestions = data.filter(suggestion =>
                            suggestion.zip_code.startsWith(inputValue)
                        );
                        console.log("Pin code filteredSuggestions", filteredSuggestions);
                        setSuggestions(filteredSuggestions);
                    })
                    .catch(error => {
                        console.error('Error:', error, 'apiUrl', apiUrl);
                    });
            // }
            //  else {
            //     setSuggestions([]);
            // }
        }, wait_time);

        return () => clearTimeout(delayDebounce);
    };

    const handleSelect = (suggestion) => {
        setInputValue(`${suggestion.zip_code}`);
        setPincode(suggestion.zip_code);
        setSuggestions([]);
        setTyping(false);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setTyping(true);
    }

    const handleFocus = async () => {
        setTyping(true);
        await fetchSuggestions(0);
        // if (!inputValue) {
        //     console.log("Input Value Null Before ************************************************")
        //     await fetchSuggestions(0);
        //     console.log("Input Value Null After ************************************************")
        // }
    };

    const handleBlur = () => {
        setTyping(false);
    };

    return (
        <div>
            <input 
                type="text" 
                // style = {{width: '300px'}}
                value={inputValue} 
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Enter Zipcode"
            />
            {suggestions.length > 0 && (
                <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                    {suggestions.map((suggestion, index) => (
                        <div key={index} onClick={() => handleSelect(suggestion)}>
                            {suggestion.zip_code}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Pincode;
