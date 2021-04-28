# 06 Server-Side APIs: Weather Dashboard
Project Owner: Aaron Au Yoong
</br>
View live link here: https://aaronauyoong.github.io/weather-dashboard/.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)

## Table of Contents
* [Introduction](#Introduction)
* [Technologies](#Technologies)
* [Functionalities](#Functionalities)
* [Screenshots](#Screenshots)
* [License](#License)

## Introduction
In order for travel enthusiasts to better plan their trips, they have the need to know weather outlooks for multiple cities. The creation of a weather dashboard would be ideal in order to meet their needs. 

## Technologies
This weather dashboard will run in the browser, feature dynamically updated HTML and CSS, and retrieve data from [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. For persistent data, localStorage will be used. 

## Functionalities
This weather dashboard comes with a built-in form input, allowing users to key in their desired city to search. Searching a city presents users with current and forecasted weather conditions. Current conditions include city name, country code, date, icon representing current weather conditions, current temperature (°C), current humidity, current wind speed (km/h) and current UV index. The UV index risk severity levels are as follows:

- Green = Low (0-2)
- Yellow = Moderate (3-5)
- Orange = High (6-7)
- Red = Very High (8-10)
- Purple = Extreme (11+)

Below the current weather conditions, are a five-day forecast displaying the date, an icon representation of weather conditions, the temperature, and the humidity.

Clicking on a city in the search history will present you with current and future conditions for that city. Search history is stored in localStorage. 

Note that the search history buttons only go up to the recent five searches. Anything older will be removed from the button list.

A clear all button allows for the user to clear their search history (and their localStorage), also causing the page to refresh, looking brand new.

The following image shows a mock-up of what is expected from this weather dashboard application: 
</br>
<img src="assets/images/06-server-side-apis-homework-demo.png" width="80%">

## Screenshots

1. Screenshot of landing page.
<br>
<img src="assets/images/weatherappscreenshot1.png" width="80%">
<br>
<br>

2. Screenshot of first search of city "Melbourne", displaying current weather and forecasted weather.
<br>
<img src="assets/images/weatherappscreenshot2.png" width="80%">
<br>
<br>

3. Screenshot of second search of city "Sydney", displaying its current weather and forecasted weather. 
<br>
<img src="assets/images/weatherappscreenshot3.png" width="80%">
<br>
<br>

4. Screenshot of clicking on search history (after conducting 5 searches), bringing up the weather forecast of previous search.
<br>
<img src="assets/images/weatherappscreenshot4.png" width="80%">
<br>
<br>

5. Screenshot of hovering over the "Clear All" button.
<br>
<img src="assets/images/weatherappscreenshot5.png" width="80%">
<br>
<br>

6. Screenshot of after clicking the "Clear All" button, effectively clearing out the localStorage and refreshing the page.
<br>
<img src="assets/images/weatherappscreenshot6.png" width="80%">
<br>
<br>

6. Screenshot of localStorage after clicking the "Clear All" button, indicating that it is now empty.
<br>
<img src="assets/images/weatherappscreenshot7.png" width="80%">
<br>
<br>

## License
Copyright (c) 2021-Present Aaron Au Yoong. All rights reserved.
