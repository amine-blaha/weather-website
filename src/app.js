const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to use
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather',
        name: 'Amine'
    })

})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About me',
        name:'Amine'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title: 'Help',
        helpMessage: 'Help message',
        name: 'Amine'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location} = {}) => {

        if(error) {
            return res.send({
                error
            })
        }

        forecast(longitude, latitude, (error, forecastData) => {

            if(error) {
                return res.send({
                    error
                })
  
            }

            res.send({
                forecastData: forecastData,
                location,
                address: req.query.address
            })

        })
              
    })
})

app.get('/products', (req, res) => {

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Amine',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Amine',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is on port 3000')
})