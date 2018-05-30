const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodedAdd = encodeURIComponent(argv.a);
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdd}&key=AIzaSyDIcNaN22u5vXpQWLFRSbwkB-9Ryy8q4LA`;

// axios.get returns a promise
axios.get(geocodeURL).then((response) => {
    // catch portion will run and message passed to error object
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherURL = `https://api.darksky.net/forecast/fb913ab4d6e62a362fabbeda47021a83/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((response) => {
    const temperature = response.data.currently.temperature;
    const apparentTemp = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemp}.`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
        // will print out 'Unable to find that address'
    }
});





