//time--------------------
let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let nau = document.querySelector("#nau");
nau.innerHTML = `${hour}:${minutes} <br> ${day}, ${month} ${date}, ${year}`;

//search engine---------------
function searchedCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-input");
    leCity.innerHTML = cityInput.value;
    city = cityInput.value
    getWeatherOfCity(city, units);
}

let leCity = document.querySelector("#city");
let leForm = document.querySelector("#search-form");
leForm.addEventListener("submit", searchedCity);

//weather API---------------------
let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
//使えないキー"0b6316953363b3ec3e7536039a47981b";
let city = "Los Angeles";
let units = "imperial";
let temperature = document.querySelector("#degrees");

function getForecast(coordinates){
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&appid=${apiKey}&units${units}`
  axios.get(forecastUrl).then(forecasting)
}

function showWeather(response) {
  temperature.innerHTML = Math.round(response.data.main.temp);
  leCity.innerHTML = response.data.name
  let desc = document.querySelector("#description")
  desc.innerHTML = response.data.weather[0].description;
  let wiind = document.querySelector("#wind")
  wiind.innerHTML = Math.round(response.data.wind.speed)
  let humi = document.querySelector("#humidity")
  humi.innerHTML = response.data.main.humidity;
  let feel = document.querySelector("#feels")
  feel.innerHTML = Math.round(response.data.main.feels_like)
  let max = document.querySelector("#max")
  max.innerHTML = Math.round(response.data.main.temp_max)
  let min = document.querySelector("#min")
  min.innerHTML = Math.round(response.data.main.temp_min)
  let coun = document.querySelector("#country")
  coun.innerHTML = response.data.sys.country
  let icon = document.querySelector("#icon")
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

  getForecast(response.data.coord)
}

function getWeatherOfCity(cityToCheck, unitToCheck){
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityToCheck}&units=${unitToCheck}`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

getWeatherOfCity(city, units)

//geolocation---------------------
function showPosition(position) {
  let lat = position.coords.latitude.toFixed(2);
  let long = position.coords.longitude.toFixed(2);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(function(response){
    city = response.data.name
    getWeatherOfCity(city, units)
  });
}

function getCurrentPosition(){
navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

//change imperial to metric (/・ω・)/-----------
function changeToC(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("inactive")
  celsiusLink.classList.add("inactive")
  let wiiind = document.querySelector("#wind-units")
  wiiind.innerHTML = ` m/sec`

  units = "metric";
  getWeatherOfCity(city, units)
}

function changeToF(event) {
  event.preventDefault()
  celsiusLink.classList.remove("inactive")
  fahrenheitLink.classList.add("inactive")
  let wiiind = document.querySelector("#wind-units")
  wiiind.innerHTML = ` mi/hr`

  units = "imperial"
  getWeatherOfCity(city, units)
}

let celsiusLink = document.querySelector("#convertC")
celsiusLink.addEventListener("click", changeToC)

let fahrenheitLink = document.querySelector("#convertF")
fahrenheitLink.addEventListener("click", changeToF)

//forecast (∩^o^)⊃━☆ﾟ.*･｡-------------
function formatDt(timestamp) {
  let ledate = new Date(timestamp * 1000)
  let leday = ledate.getDay()
  let jours = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return jours[leday]
}

function forecasting(response){
  let dailycat = response.data.daily
  let forecast = document.querySelector("#forecast")
 
  let forecastHTML = `<div class="row justify-content-center">`
  dailycat.forEach(function(dailycatDay){
  
    forecastHTML = forecastHTML + `
    <div class="col col-sm-2 days">
      <div id="weekday">${formatDt(dailycatDay.dt)}</div>
        <div class="tenki"><img src="http://openweathermap.org/img/wn/${dailycatDay.weather[0].icon}@2x.png" class="forecast-icon"></div>
          <div id="forecast-max">${Math.round(dailycatDay.temp.max)}<span>°/</span><span id="forecast-min">${Math.round(dailycatDay.temp.min)}</span>°</div>
    </div>`
  })

  forecastHTML = forecastHTML + `</div>`
  forecast.innerHTML = forecastHTML
}