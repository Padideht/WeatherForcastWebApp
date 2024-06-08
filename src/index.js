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

  getForcast(response.data.city);
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

function getForcast(city) {
  let ApiKey = "b4b90t01e78a6d3ae3ea0adb94efof84";
  let ApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${ApiKey}&units=metric`;
  axios(ApiUrl).then(displayWeek);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]; //آرایه ای از روزهای هفته
  return days[date.getDay()];
}

function displayWeek(response) {
  //نمایش روزهای هفته و دمای هر روز با حلقه

  let forcastHtml = ""; //یک رشته خالی برای نمایش قالب آب و هوا

  response.data.daily.forEach(function showDay(day, index) {
    // به جای روز از ریسپانس استفاده می کنیم تا داده های مورد نظر را از ای پی آی فراخوانی کنیم
    if (index < 7) {
      forcastHtml += `
    <div class="weather-forcast-day">
        <div class="week-day">${formatDay(day.time)}</div>
          <img src="${
            day.condition.icon_url
          }" alt="weekly weather icon" class="weekly-icon-image" />
          <div class="min-max-temperature">
            <div class="hotest-temp"><strong>${Math.round(
              day.temperature.maximum
            )}°</strong></div>
            <div class="coldest-temp"><strong>${Math.round(
              day.temperature.minimum
            )}°</strong></div>
        </div>
        </div>`;
    }
  });

  let forcast = document.querySelector("#weekly-weather"); //انتخاب دیو مورد نظر با استفاده از آی دی
  forcast.innerHTML = forcastHtml; // کد اچ تی ام ال آن را برابر با کدی که تولید کردیم قرار می دهیم
}

let searchingForm = document.querySelector("#search-form");
searchingForm.addEventListener("submit", handleSearching);
searchingEnteredCity("Berlin");
