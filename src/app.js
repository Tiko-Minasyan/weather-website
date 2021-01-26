const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tigran'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tigran'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'OH GOD PLEASE HELP',
        title: 'HELP ME',
        name: 'Tigran'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            return res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/profucts', (res, req) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search retm'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tigran',
        errorMessage: 'WRONG PAGE HELPLESS IDIOT'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tigran',
        errorMessage: 'WRONG PAGE IDIOT'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})