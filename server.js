const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var geocode = require('./geocode');
const weather = require('./weather');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

const port = process.env.PORT || 3000;

//Basic Middleware
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n', (err)=>{
        if(err)
            console.log('error');
    });
    console.log(`${now}: ${req.method} ${req.url}`);
    next();
});

// app.use((req,res,next)=>{
//     res.render('maitenance.hbs');
// });

//Middleware
app.use(express.static(__dirname + '/'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/', (request, response)=>{
    // response.send('<h1>Hello Express</h1>');
    // response.send({
    //     name: 'Lukas',
    //     likes: ['Futbolas', 'Programavimas']
    // });
    response.render('home.hbs',{
        pageTitle:'Home page',
        message:'Weather page'
    })
});

app.get('/about',(request, response) => {
    response.render('about.hbs', {
        pageTitle:'About page',
    });
});

app.get('/projects',(request, response) => {
    response.render('projects.hbs', {
        pageTitle:'Portfolio Page',
        message: 'Sveiki atvykę į projekto puslapį'
    });
});

app.get('/bad',(request,response)=>{
    response.send({
        errorMessage: 'Negalima pasiekti puslapio'
    })
});

//
//Goal: Update weather endpoint to accept address
//
// 1. No address? Send back an error message
// 2. Address? Send back the static JSON
//      - Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=siauliai

app.get('/weather', (request, response)=> {
    if(!request.query.address){
        return response.send({
            error:"Please provide address parameter"
        });
    }
    geocode.geocodeAddress(request.query.address, (error, results)=> {
        weather.getWeather(results.lat, results.lng, (error, forecastData) => {
            if(error)
                return response.send({error});
            response.send({
                forecast: forecastData,
                address: results.address
            })
        });
    })
});

app.listen(port, ()=>{
    console.log(`Server is up to run on port ${port}`);
});