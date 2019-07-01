const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const city = document.querySelector('#city');
const message1 = document.querySelector('#first-message');
const message2 = document.querySelector('#second-message');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.classList.add('error');
            message1.textContent = "Error!";
        } else{
            city.textContent = data.address;
            message1.textContent = 'Temperature:' + data.forecast.temperature;
            message2.textContent = 'Felling temperature:' + data.forecast.fellingTemperature;
        }})
    });
});