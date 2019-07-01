const request = require('request');

var getWeather = (lat,lng,callback) =>{
    request({
        url:`https://api.darksky.net/forecast/cf3a775bc1585bdc5dcd0259f6df0ca7/${lat},${lng}`,
        json:true
    },(error, response, body) => {
        if(error){
            callback('Unable to connect to Forecast.io servers');
        } else if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature:Math.round((body.currently.temperature - 32) * 5/9),
                fellingTemperature:Math.round((body.currently.apparentTemperature - 32) * 5/9)
            });
        } else {
            callback('Unable to fetch weather forecast');
        }
    
    });
};

module.exports.getWeather = getWeather;
