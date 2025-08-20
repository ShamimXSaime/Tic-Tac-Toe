const apiKey="641615ccbf245ec749d01bb73b057a54";
const searchButton=document.getElementById("searchButton");
const cityInput=document.getElementById("cityInput");
const weatherInfo=document.getElementById("weatherInfo");

searchButton.addEventListener("click", ()=>{
    const city=cityInput.value.trim();
    if(city){
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response=await fetch(url);
        if (!response.ok) {
            throw new Error("CITY Not Found");
        }
        const data= await response.json();

        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML=`<p>${error.message}</p>`;
    }
}

function displayWeather(data){
    const {name}=data;
    const {temp, humidity}=data.main;
    const {description, icon}=data.weather[0];

    weatherInfo.innerHTML=`
    <h2>${name}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    <p>🌡 Temp: ${temp}°C</p>
    <p>💧 Humidity: ${humidity}%</p>
    <p>🌍 Condition: ${description}</p>`;
}