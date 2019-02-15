const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



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
app.use(express.static(__dirname + '/public'));

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
        message:'Welcome'
    })
});

app.get('/about',(request, response) => {
    response.render('about.hbs', {
        pageTitle:'About page',
    });
});

app.get('/bad',(request,response)=>{
    response.send({
        errorMessage: 'Negalima pasiekti puslapio'
    })
});

app.listen(3000, ()=>{
    console.log('Server is up to run on port 3000');
});