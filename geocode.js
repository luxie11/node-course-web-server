const request = require('request');

const geocodeAddress = (address, callback) =>{
    var encodedValue = encodeURIComponent(address);
    //Reikia, kad vartotojas ivestu Geguziu 73 Siauliai
    request({
        //url:`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC0QDOUhUD9E3mvqy8pfc5VZrFpZ6fx7r4&address=siauliai`,
        url:`https://api.opencagedata.com/geocode/v1/json?q=${encodedValue}&key=dc13928a8c7b4c6b9a0998ee857cbdef`,
        json: true
    },(error, response, body)=>{
        if(error){
            callback('Unable to connect to Google servers');
        } else if(body.status.message === 'ZERO_RESULTS'){
            callback('Unable to find that address');
        } else if(body.status.message === 'OK'){
            callback(undefined,{
                address:body.results[0].formatted,
                lat:body.results[0].geometry.lat,
                lng:body.results[0].geometry.lng
            });
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;
