import chalk from 'chalk';
import dedent from 'dedent-js';
import { t } from 'i18next';

import { openWeatherData } from './interfaces.js';

const printError = (error?: string | null) => {
  console.error(chalk.bgRed(' ERROR '), error);
}

const printSuccess = (message?: string | null) => {
  console.info(chalk.bgGreen(' SUCCESS '), message);
}

const printHelp = (lng?: string) => {
  console.info(dedent`${chalk.bgCyan(` ${t('HELP', {lng})} `)}
    ${t('helpText', {lng})}`);
}

const printWeather = (data: openWeatherData, lng = 'ru') => {
  console.info(
    dedent`${chalk.bold.underline.greenBright(t('weatherLocation', {lng, city: data.name}))}
    ${getWeatherIcon(data.weather[0].icon)}  ${data.weather[0].description}
    ${t('weatherTemperature', {lng, ...data.main})}
    ${t('weatherHumidity', {lng, humidity: data.main.humidity})}
    ${t('weatherWind', {lng, wind_speed: data.wind.speed})}

    `);
}

const getWeatherIcon = (icon: string) => {
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

export { printError, printSuccess, printHelp, printWeather };
