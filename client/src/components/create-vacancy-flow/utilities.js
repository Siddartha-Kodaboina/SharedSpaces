export const generateAddress = (address_components) => {
    const AddressDetails = {
        'address': '',
        'postal_code': '',
        'city': '',
        'state': '',
        'state_code': '',
        'country': '',
        'country_code': ''
    }
    address_components.forEach(component => {
          
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number": {
            // console.log(`street_number: ${communityDetails.address} ${component.long_name}`);
            AddressDetails.address += " " + component.long_name;
            break;
          }

          case "route": {
            // console.log(`route: ${communityDetails.address} ${component.long_name}`);
            AddressDetails.address += " " + component.short_name;
            break;
          }

          case "postal_code": {
            AddressDetails.postal_code = component.long_name;
            break;
          }

          case "locality":{
            AddressDetails.city =  component.long_name;
            break;
          }
          case "administrative_area_level_1": {
            AddressDetails.state =  component.long_name;
            AddressDetails.state_code =  component.short_name;
            break;
          }
          case "country":{
            AddressDetails.country =  component.long_name;
            AddressDetails.country_code =  component.short_name;
            break;
          }
        }
    });

    return AddressDetails;
}

export const numberFieldParameters = {
    totalPlots: {
        limit: 500,
        step: 10
    },
    averageRent: {
        limit: 500,
        step: 5
    },
    totalBedRooms: {
        limit: 5,
        step: 1
    },
    bathRooms: {
        limit: 5,
        step: 0.5
    },
    peopleCount: {
        limit: 20,
        step: 1
    },
    maleCount: {
        limit: 20,
        step: 1
    },
    femaleCount:{
        limit: 20,
        step: 1
    },
    childrenCount: {
        limit: 20,
        step: 1
    },
    sharingType: {
        limit: 5,
        step: 1
    },
    roomUniversityDistance: {
        limit: 100,
        step: 0.5
    }
}

export const numberFieldsInText = [
    'monthlyRent',
    'postal_code'
]