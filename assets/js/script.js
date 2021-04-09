// OpenWeather API Key
let weatherAPIKey = "3f6064abc9bf7b1ed4920185e7d8007a";

// Define main variables
let searchHistoryEl = document.getElementById("searchHistory");
let clearSearchButton = document.getElementById("clearHistoryBtn");
let currentWeatherForecast = document.getElementById("cityForecastNow");
let forecastResults = document.getElementById("city5DayForecast");
let citySearch = document.getElementById("citySearchInput");
let currentWeatherIcon = document.getElementById("weatherIcon");
let citySearchButton = document.getElementById("searchBtn");
let forecastContainerEl = document.getElementById("fiveDayForecastContainer");

const cityName = document.getElementById("thisCity");
const currentTemp = document.getElementById("temperature");
const currentHumidity = document.getElementById("humidity");
const currentWindSpeed = document.getElementById("windSpeed");

function dateTime() {
    date = moment(new Date())
    datetime.html(date.format("Do MMMM YYYY"));
};

$(document).ready(function () {
    datetime = $('#dateNow')
    dateTime();
});

// SEARCH HISTORY SECTION

// Add event listener for search button
citySearchButton.addEventListener("click", function (event) {
    event.preventDefault();

    let citySearchValue = citySearch.value;

    let cityNames = JSON.parse(localStorage.getItem('cityName')) || [];

    if (!cityNames.includes(citySearchValue)) {
        cityNames.unshift(citySearchValue);
    }

    cityNames.splice(5);

    localStorage.setItem("cityName", JSON.stringify(cityNames));

    clearForecastCards();
    getWeatherToday(citySearchValue);
    displaySearchHistory();
});

function displaySearchHistory() {
    searchHistoryEl.innerHTML = "";

    if (localStorage.getItem('cityName')) {
        JSON.parse(localStorage.getItem('cityName')).forEach(function (city) {

            const cityHistoryButton = document.createElement("button");
            cityHistoryButton.textContent = city;
            searchHistoryEl.appendChild(cityHistoryButton);
    
            cityHistoryButton.addEventListener("click", function () {
                getWeatherToday(city)
            });
        });
    };
};

function getWeatherToday(city) {
    
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}`;

    fetch(weatherAPIUrl)
    .then((response) => response.json())
    .then(function (data) {
        
        // Retrieving latitude and longitude for UV Index perusal
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;

        const weatherForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${weatherAPIKey}`;
        
        displayCurrentWeather(data);
        
        fetch(weatherForecastURL)            
        .then(function (response) {
            if (response.error) {
                throw new Error("Unable to obtain weather forecast data"); 
            } 
            
            return response.json();
            
        }).then(function (data) {

            displayUVI(data);
            displayFiveDayForecast(data.daily.slice(1,6));
        }).catch(error => {
            console.log("error: ", error)
        });
        showResults();
    }); 
};

// Function to display UV Index and weather icon (linked to same onecall API)
function displayUVI(data) {

    const currentUVIndex = document.getElementById("uvIndexRisk");
    const apiUVIndex = data.current.uvi;
    const apiWeatherIcon = data.current.weather[0].icon;
    
    currentWeatherIcon.src = "https://openweathermap.org/img/wn/" + apiWeatherIcon + ".png";
    currentUVIndex.innerHTML = apiUVIndex;

    $("#uvIndexRisk").removeClass("uvLow uvModerate uvHigh uvVeryHigh uvExtreme");

    if (apiUVIndex >= 0 && apiUVIndex <= 2.99) return currentUVIndex.classList.add("uvLow");
    if (apiUVIndex >= 3 && apiUVIndex <= 5.99) return currentUVIndex.classList.add("uvModerate");
    if (apiUVIndex >= 6 && apiUVIndex <= 7.99) return currentUVIndex.classList.add("uvHigh");
    if (apiUVIndex >= 8 && apiUVIndex <= 10.99) return currentUVIndex.classList.add("uvVeryHigh");
    return currentUVIndex.classList.add("uvExtreme");

}; 

function displayFiveDayForecast(days) {

    days.forEach((day) => {
        const forecastDate = moment.unix(day.dt).format("ddd, DD MMM YYYY");
        let forecastIcon = day.weather[0].icon;
        let forecastIconUrl = "https://openweathermap.org/img/wn/" + forecastIcon + ".png";
        let forecastTemp = day.temp.max;
        let celsiusTempForecast = CELSIUS_CONVERSION(forecastTemp).toFixed(1);
        let forecastHumidity =  day.humidity;

        const weatherCard = `
        <div id="fiveDayForecastCard" class="weatherCard">
        <h5>${forecastDate}</h5>
        <img src=${forecastIconUrl} alt="This is a weather forecast indicator icon."/>
        <p>Temperature: <span>${celsiusTempForecast}</span> °C</p>
        <p>Humidity: <span>${forecastHumidity} %</span></p>
        </div> 
        `;

        forecastContainerEl.innerHTML += weatherCard;
    });
};

function clearForecastCards() {
    forecastContainerEl.innerHTML = "";
};

function displayCurrentWeather(data){

    const kelvinTemp = data.main.temp;
    const windSpeedMs = data.wind.speed;

    cityName.innerHTML = data.name + ", " + data.sys.country;
    currentTemp.innerHTML = CELSIUS_CONVERSION(kelvinTemp).toFixed(1);
    currentHumidity.innerHTML = data.main.humidity;
    currentWindSpeed.innerHTML = KmH_CONVERSION(windSpeedMs).toFixed(1);
};

// Converting from Kelvin to Degrees Celsius
function CELSIUS_CONVERSION(kelvinTemp) {
    return kelvinTemp - 273.15;
};

// Converting from Meters per Second to Kilometers per Hour
function KmH_CONVERSION(windSpeedMs) {
    return windSpeedMs * 3.6;
};

function showResults() {
    currentWeatherForecast.classList.remove('hide');
    forecastResults.classList.remove('hide');
};

// Clear Search History Button
clearSearchButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})