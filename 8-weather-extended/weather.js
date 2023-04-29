#!/usr/bin/env node
import { AxiosError } from 'axios';
import { getWeather } from './services/api.service.js';
import { parseArgs } from './services/args.service.js';
import { APP_DICTIONARY, appConfig } from './services/config.service.js';
import i18n from './services/locale.service.js';
import { printError, printWeather } from './services/console.service.js';

let t;

const getForecast = async (city, token, lang = 'ru') => {
  try {
    return await getWeather(city, token, lang);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        printError(t('errorCityNonFound', {city}));
      } else if (error.response?.status === 401) {
        printError(t('errorTokenIsInvalid'));
      }
      printError(error.response?.data.message);
    } else {
      printError(error?.message);
    }
  }
}

const initCli = async () => {
  await parseArgs();
  
  const lang = appConfig.getKey(APP_DICTIONARY.lang);
  t = i18n(lang);

  const token = appConfig.getKey(APP_DICTIONARY.token);
  if (!token){
    printError(t('errorTokenNotDefined'));
    return;
  }

  const cities = appConfig.getKey(APP_DICTIONARY.city);
  if (!cities) {
    printError(t('errorCityNotDefined'));
    return;
  }

  for(const city of cities) {
    const data = await getForecast(city, token, lang);
    printWeather(data, lang);
  }  
}

initCli();
