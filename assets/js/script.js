// OpenWeather API Key
let weatherAPIKey = "3f6064abc9bf7b1ed4920185e7d8007a";

// Empty array for search history
let citySearchHistory = [];

// Define main variables
let dailyWeatherResults = document.getElementById("searchResults");
let forecastResults = document.getElementById("city5DayForecast");
let citySearchInput = document.querySelector("#citySearchInput");
let cityWeatherForm = document.querySelector("#cityWeatherSearchForm");

const currentWeatherArticle = document.getElementById("todayWeatherContainer");
const fiveDayArticle = document.getElementById("fiveDayForecastContainer");

// let currentWeatherEl = document.querySelector("#todayWeatherContainer");

// Retrieve today's weather from OpenWeather's API
function getWeatherToday(cityName) {
    
    // URL
    const weatherAPIUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + "Sydney" + "&appid=" + weatherAPIKey;

    // Fetching weather data from OpenWeather API
    fetch(weatherAPIUrl)
        // method: 'GET',
        // headers: {
        //     'accept' : 'application/json',
        // }
    .then((response) => response.json())
    .then(function (data){
        
        displayCurrentWeather(data);

        // displayFiveDayForecast(data);
    });
};

// Function to display today's weather data
function displayCurrentWeather(data){

    // API Results as constants
    const cityName = document.getElementById("thisCity");
    const currentTemp = document.getElementById("temperature");
    // converting temperature from Kelvin to °C, by deducting 273.15
        // used JS toFixed(1) function to convert number to string with 1 decimal place
    const celsiusTemp = (data.main.temp - 273.15).toFixed(1);

    const currentHumidity = document.getElementById("humidity");

    const currentWindSpeed = document.getElementById("windSpeed");
    // converting wind speed from meters per second to km per hour, through multiplying value by 3.6
        // used JS toFixed(1) function to convert number to string with 1 decimal place
    const windSpeedKMH = (data.wind.speed * 3.6).toFixed(1);
    console.log(windSpeedKMH);

    const currentUVIndex = document.getElementById("uvIndex");

    // Populating results into respective html elements
    cityName.innerHTML = data.name + ", " + data.sys.country;
    currentTemp.innerHTML = celsiusTemp;
    currentHumidity.innerHTML = data.main.humidity;
    currentWindSpeed.innerHTML = windSpeedKMH;

};

//         const data = await response.json();

//         // Display weather results in html divs todayWeatherContainer and city5DayForecast 

//         // const weatherImg = document.currentWeatherArticle.createElement('img');

//         // img.setAttribute('src', data.icon);

//         // imgArticle.appendChild(weatherImg);

//         currentTemp.textContent = data.temp;
//         currentHumidity.textContent = data.humidity;
//         currentWindSpeed.textContent = data.speed + "km/h";

//     })


// };

getWeatherToday();

function showCurrentWeather() {
    dailyWeatherResults.classList.remove('hide');
};

function show5DayForecast() {
    forecastResults.classList.remove('hide');
};

show5DayForecast();
showCurrentWeather();

    // // Fetching today's weather from OpenWeather API
    // fetch(weatherAPIUrl).then(function (response) {
    //     if (response.ok) {
    //         return response.json()
    //     } else {
    //         return Promise.reject("Failed to retrieve today's weather data. Please try again.");
    //     }
    // }).then (async (response) => {

    //     // This section will filter out the received data to populate the html div cityForecastNow

    //     let weatherIcon = data.weather[0].icon;
    //     let iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";

    //     $("#weather-icon").attr("src", iconUrl);
    // });

// Get five day forecast from API
// function getFiveDayForecast() {

// };

// Function to get today's date and time upon page load
function dateTime() {
    date = moment(new Date())
    datetime.html(date.format("Do MMMM YYYY"));
};

$(document).ready(function () {
    datetime = $('#dateNow')
    dateTime();
});

// Display 5 day forecast

// function displayFiveDayForecast() {

// };

// Search button
// function cityWeatherSearch(event) {
//     event.preventDefault();

//     let city = citySearchInput.value.trim();

//     if(city){
//         getWeatherToday(city);
//         getFiveDayForecast(city);
//         citySearchHistory.unshift({city});
//         citySearchInput.value = "";
//     } else {
//         window.alert("Please enter a city name in the search bar.");
//     };

//     // Functions for saving search and adding it to searchHistory
//     // saveSearchHistory();
//     displaySearchHistory(city);
// };

// Function to save search history to localStorage
// function saveSearchHistory() {
//     localStorage.setItem("cityHistory", JSON.stringify(citySearchHistory));
// };

// Display search history as buttons on left side

// function displaySearchHistory() {

// };

// Event listeners
// cityWeatherForm.addEventListener("submit", getWeatherToday);