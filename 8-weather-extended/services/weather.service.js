import chalk from 'chalk';
import dedent from 'dedent-js';

const printWeather = (res, lang = 'ru') => {
  const template_ru = dedent`${chalk.bold.underline.greenBright(`Погода в городе ${res.name}`)}
  ${getWeatherIcon(res.weather[0].icon)}  ${res.weather[0].description} 
  Температура: ${res.main.temp}, ощущается как ${res.main.feels_like}
  Влажность: ${res.main.humidity}%
  Скорость ветра: ${res.wind.speed} м/с`;

  const template_en = dedent`${chalk.bold.underline.greenBright(`Weather in location ${res.name}`)}
  ${getWeatherIcon(res.weather[0].icon)}  ${res.weather[0].description} 
  Temperature: ${res.main.temp}, feels like ${res.main.feels_like}
  Humidity: ${res.main.humidity}%
  Wind speed: ${res.wind.speed} m/s`;

  console.info(lang === 'ru' ? template_ru : template_en);
}

const getWeatherIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
    default:
      return '';
  }
}

export { printWeather }
