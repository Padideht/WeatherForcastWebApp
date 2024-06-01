function handleSearching(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#input-city");

  searchingEnteredCity(searchedCity.value);
}

function searchingEnteredCity(city) {
  let ApiKey = "b4b90t01e78a6d3ae3ea0adb94efof84";
  let ApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${ApiKey}`;
  axios.get(ApiUrl).then(showWeatherInfo);
}

function showWeatherInfo(response) {
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  let shownCity = document.querySelector("#city");
  shownCity.innerHTML = response.data.city;
  let descriptionElenemt = document.querySelector("#description");
  descriptionElenemt.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  let dateTimeElement = document.querySelector("#date-time");
  let dateTime = new Date(response.data.time * 1000); // converting ms to s?
  dateTimeElement.innerHTML = showDate(dateTime);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
                src=${response.data.condition.icon_url}
                alt="weather icon"
                class="icon-image"
              />`;
}

function showDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];
  return `${day} ${hours}:${minutes},`;
}

let searchingForm = document.querySelector("#search-form");
searchingForm.addEventListener("submit", handleSearching);
searchingEnteredCity("Berlin");
