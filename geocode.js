const request = require('request');

const geocodeAddress = (address, callback) =>{
    var encodedValue = encodeURIComponent(address);
    var key = 'ENTER_KEY';
    request({
        url:`https://api.opencagedata.com/geocode/v1/json?q=${encodedValue}&key=${key}`,
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
