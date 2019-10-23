const request = require('request')

const geocode = (address, callback) => {

    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiYW1pbmVibGFoYTAwIiwiYSI6ImNrMDJ3YW95dDAyNG4zbnBhb2Rmd3Awd2sifQ.OTN0S8_TVP_s5E6rM_kdqQ&limit=1'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect', undefined)

        } else if (body.features.length === 0){
            callback('Unable to connect to location services')

        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode