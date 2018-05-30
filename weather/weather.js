const request = require('request');

const APIKey = 'fb913ab4d6e62a362fabbeda47021a83';
var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${APIKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        } else {
            callback('Unable to fetch weather');
        }
    });
};

module.exports.getWeather = getWeather;

//fb913ab4d6e62a362fabbeda47021a83

// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
