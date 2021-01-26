const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        json: true,
        qs: {
            lon: longitude,
            lat: latitude,
            units: 'metric'
        },
        headers: {
            'x-rapidapi-key': 'ea822f4bebmsh2c7871d656d1da9p1d5013jsn551aaf0632ba',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
            useQueryString: true
        }
    };

    request(options, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined);
        } else if(body.cod == 400) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, 'It is currently ' + body.main.temp + ' out there. Air humidity is ' + body.main.humidity + '.');
        }
    })
    
}

module.exports = forecast;