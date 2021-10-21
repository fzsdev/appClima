const api = {
  base: 'https://api.openweathermap.org/data/2.5/',
  key: '399ec50627b47e923d0a5928dcfd589b',
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(
    `${api.base}weather?q=${query}&units=metric&APPID=399ec50627b47e923d0a5928dcfd589b`
  )
    .then(weather => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `min ${Math.round(
    weather.main.temp_min
  )}°C - max ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(dt) {
  let months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  let days = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  let day = days[dt.getDay()];
  let date = dt.getDate();
  let month = months[dt.getMonth()];
  let year = dt.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
