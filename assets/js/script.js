// OpenWeather API Key
let weatherAPIKey = "3f6064abc9bf7b1ed4920185e7d8007a";

// Empty array for search history
let citySearchHistory = [];

// Define main variables
let dailyWeatherResults = document.getElementById("searchResults");
let forecastResults = document.getElementById("city5DayForecast");
let citySearch = document.getElementById("citySearchInput");
let cityWeatherForm = document.getElementById("cityWeatherSearchForm");
let currentWeatherIcon = document.getElementById("weatherIcon");
let citySearchBtn = document.getElementById("searchBtn");

const currentWeatherArticle = document.getElementById("todayWeatherContainer");
const fiveDayArticle = document.getElementById("fiveDayForecastContainer");

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

// Retrieve today's weather from OpenWeather's API
function getWeatherToday(citySearch) {
    
    const weatherAPIUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + "Kuala Lumpur" + "&appid=" + weatherAPIKey;

    fetch(weatherAPIUrl)
    .then((response) => response.json())
    .then(function (data) {
        
        // Retrieving latitude and longitude for UV Index perusal
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;
        const weatherForecastURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&appid=" + weatherAPIKey;
        
        displayCurrentWeather(data);

        fetch(weatherForecastURL)            
        .then(function (response) {
            if (response.error) {
                throw new Error("Unable to obtain weather forecast data"); 
            } 
            
            return response.json();
            
        }).then(function (data) {

            console.log(data);
            console.log(data.current.uvi);
            console.log(data.current.temp);

            displayUVI(data);
            displayFiveDayForecast(data);
        }).catch(error => {
            console.log("error: ", error)
        });
    });
};

// Function to display UV Index and weather icon (linked to same onecall API)
function displayUVI(data) {

    const currentUVIndex = document.getElementById("uvIndexRisk");
    const apiWeatherIcon = data.current.weather[0].icon;
    
    currentWeatherIcon.src = "https://openweathermap.org/img/wn/" + apiWeatherIcon + ".png";
    currentUVIndex.innerHTML = data.current.uvi;

    if (currentUVIndex < 2) {
        currentUVIndex.classList.add("uvLow");
    } else if (currentUVIndex >= 2 && currentUVIndex <= 5) {
        currentUVIndex.classList.add("uvModerate");
    } else if (currentUVIndex >= 6 && currentUVIndex <= 7) {
        currentUVIndex.classList.add("uvHigh");
    } else if (currentUVIndex >= 8 && currentUVIndex <= 10) {
        currentUVIndex.classList.add("uvVeryHigh");
    } else {
        currentUVIndex.classList.add("uvExtreme");
    }

    // Insert five day forecast function here
}; 

function displayFiveDayForecast(data) {

};

function displayCurrentWeather(data){

    const kelvinTemp = data.main.temp;
    const windSpeedMs = data.wind.speed;

    // Populating results into respective html elements
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

getWeatherToday();

function showCurrentWeather() {
    dailyWeatherResults.classList.remove('hide');
};

function show5DayForecast() {
    forecastResults.classList.remove('hide');
};

show5DayForecast();
showCurrentWeather();

// Function to save search history to localStorage
// function saveSearchHistory() {
//     localStorage.setItem("cityHistory", JSON.stringify(citySearchHistory));
// };

// Display search history as buttons on left side

// function displaySearchHistory() {
// };

// Search Button

// citySearchBtn.click(function () {

//     if (cityName === "") {
//         return;
//     }
//     getWeatherToday(cityName);
//     // Add function for five day forecast
//     // // 
//     // Add function for storing to localStorage
// });

// cityWeatherForm.click(function (event) {
//     event.preventDefault();
//     citySearchBtn.click();
// });


// Event listeners
// $(cityWeatherSearchForm).click("submit", getWeatherToday);