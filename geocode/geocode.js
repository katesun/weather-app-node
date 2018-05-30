const request = require('request');

const APIKey = 'AIzaSyDIcNaN22u5vXpQWLFRSbwkB-9Ryy8q4LA';
const ROOTURL = 'https://maps.googleapis.com/maps/api/geocode/json?';

const geocodeAddress = (address, callback) => {
    const encodedAdd = encodeURIComponent(address);

    request({
        url: `${ROOTURL}address=${encodedAdd}&key=${APIKey}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        } else if (body.status === 'OK') {
            //console.log(JSON.stringify(response, undefined, 2));
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports = {
    geocodeAddress
};