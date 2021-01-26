const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGlrbzIwMDAiLCJhIjoiY2trM3o0bTY4MWZ0ajJ2cXNhMXk1YzQ0cyJ9._hEr4nLTrFp6nYtkmHEHnA'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to  connect to location services!', undefined)
        } else if(body.features.length == 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;