import chalk from 'chalk';
import dedent from 'dedent-js';
import { t } from 'i18next';

import { openWeatherData } from './interfaces.js';

// Two different sets of icons for day and night
const iconsByCode: Record<string, string> = {
  '01d': '☀️',
  '02d': '🌤️',
  '03d': '☁️',
  '04d': '☁️',
  '09d': '🌧️',
  '10d': '🌦️',
  '11d': '🌩️',
  '13d': '❄️',
  '50d': '🌫️',

  '01n': '🌙',
  '02n': '🌑',
  '03n': '☁️',
  '04n': '☁️',
  '09n': '🌧️',
  '10n': '🌦️',
  '11n': '🌩️',
  '13n': '❄️',
  '50n': '🌫️',
}

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
    ${iconsByCode[data.weather[0].icon]}  ${data.weather[0].description}
    ${t('weatherTemperature', {lng, ...data.main})}
    ${t('weatherHumidity', {lng, humidity: data.main.humidity})}
    ${t('weatherWind', {lng, wind_speed: data.wind.speed})}

    `);
}

export { printError, printSuccess, printHelp, printWeather };
