const request = require('request');

const APIKey = 'AIzaSyDIcNaN22u5vXpQWLFRSbwkB-9Ryy8q4LA';
const ROOTURL = 'https://maps.googleapis.com/maps/api/geocode/json?';

var geocodeAddress = (address) => {
    const encodedAdd = encodeURIComponent(address);

    return new Promise((resolve, reject) => {
        request({
            url: `${ROOTURL}address=${encodedAdd}&key=${APIKey}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
    
};

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage)
});

