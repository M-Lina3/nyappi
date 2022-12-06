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
    getWeatherOfCity(city);
}

let leCity = document.querySelector("#city");
let leForm = document.querySelector("#search-form");
leForm.addEventListener("submit", searchedCity);

let temperature = document.querySelector("#degrees");



//weather API---------------------
let apiKey = "0b6316953363b3ec3e7536039a47981b";
let city = "Los Angeles";
let units = "imperial";

function showTemperature(response) {
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
}

function getWeatherOfCity(cityToCheck){
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityToCheck}&units=${units}`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

getWeatherOfCity(city)

//geolocation---------------------
function showPosition(position) {
  let lat = position.coords.latitude.toFixed(2);
  let long = position.coords.longitude.toFixed(2);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentPosition(){
navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);




//convert F to C & vice versa-----------------
/*function convertToF(event) {
  event.preventDefault();
  let leTemps = temperature.innerHTML;
  leTemps = Number(leTemps);
  temperature.innerHTML = Math.round(((leTemps - 32) * 5) / 9);
}

let changeFahre = document.querySelector("#convertC");

changeFahre.addEventListener("click", convertToF);

let changeCel = document.querySelector("#convertF");
changeCel.addEventListener("click", converttoC);

function converttoC(event) {
  event.preventDefault();
  let elTiempo = temperature.innerHTML;
  elTiempo = Number(elTiempo);
  temperature.innerHTML = Math.round((elTiempo * 9) / 5 + 32);
} */