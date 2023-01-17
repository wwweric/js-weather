
let url = 'https://api.aoikujira.com/tenki/week.php?fmt=json&city=319';


const getApiData = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

const createWeatherElement = (weather) => (`
<div>
  <div>${weather.date}</div>
  <div>${weather.forecast}</div>
  <div>${weather.mintemp}℃</div>
  <div>${weather.maxtemp}℃</div>
</div>
`);

const todayWeather = (weathers) => {
  const todayContainerElement = document.getElementById('today_weather');
  const todayWeatherData = weathers.slice(0,1);
  todayContainerElement.innerHTML = createWeatherElement(todayWeatherData[0]);
}

const yesterdayWeather = (weathers) => {
  const yesterdayContainerElement = document.getElementById('yesterday_weather');
  const yesterdayWeatherData = weathers.slice(1,2);
  yesterdayContainerElement.innerHTML = createWeatherElement(yesterdayWeatherData[0]);
}


const appendWeathers = (weathers) => {
  const weatherContainerElement = document.getElementById('weather_list');
  let innerHTML = '';
  const weatherDataList = weathers.slice(2);
  weatherDataList.map((weather) => {
    innerHTML += createWeatherElement(weather);
  })
  weatherContainerElement.innerHTML = innerHTML;
}

const init = async () => {
  const getData = await getApiData();
  const data = getData[319];
  todayWeather(data);
  yesterdayWeather(data);
  appendWeathers(data);
}

init();