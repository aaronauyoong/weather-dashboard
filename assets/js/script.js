// Define main variables
let citySearchInput = document.querySelector("#citySearchInput");

// Empty array for search history
let cityHistory = [];

// Search button
let cityWeatherSearch = function(event){
    event.preventDefault();

    let city = citySearchInput.value.trim();

    if(city){
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else{
        window.alert("Please enter a city name in the search bar.");
    }

    // Functions for saving search and adding it to searchHistory
    saveSearchHistory();
    searchHistory(city);
};

// Function to save search history to localStorage
let saveSearchHistory = function(){
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
};


// Get weather API
function getWeather() {

    let weatherAPIKey = "3f6064abc9bf7b1ed4920185e7d8007a";
    let weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherAPIKey}'

};

// Display weather data

function displayWeatherData() {

};

// Display current date
// Moment.js

// Display UV index

function displayUVIndex() {

};

// Display 5 day forecast

function displayFiveDayForecast() {

}