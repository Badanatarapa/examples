export const getWeatherInfo = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e93eda41e6d8835105d2bbcd9bc00dfc`,
    {
      method: 'POST',
    },
  );
  const result = await response.json();
  const celcius = (result.main.temp - 273.15).toFixed(0);
  document.getElementById('temperature').innerHTML = celcius + '°C';
};
