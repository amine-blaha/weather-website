const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const url = 'https://api.darksky.net/forecast/3125e1dfe3745f3f5193b379fa04be93/'+longitude+ ',' + latitude

    request({ url: url, json:true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)

        } else if (body.error) {
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, body.daily.data[0].summary + 'the high today is:' + body.daily.data[0].temperatureHigh + 'with a low of:'+ body.daily.data[0].temperatureLow)

        }
    })

}

module.exports = forecast