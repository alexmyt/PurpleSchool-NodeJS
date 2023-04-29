#!/usr/bin/env node
import { AxiosError } from 'axios';
import { t } from 'i18next';

import './services/locale.service.js';
import { getWeather } from './services/api.service.js';
import { parseArgs } from './services/args.service.js';
import { APP_DICTIONARY, appConfig } from './services/config.service.js';
import { printError, printWeather } from './services/console.service.js';

const getForecast = async (city: string, token: string, lng = 'ru') => {
  try {
    return await getWeather(city, token, lng);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        printError(t('errorCityNonFound', {lng, city}));
      } else if (error.response?.status === 401) {
        printError(t('errorTokenIsInvalid', {lng}));
      }
      printError(error.response?.data.message);
    } else if (error instanceof Error){
      printError(error.message);
    } else {
      printError(typeof(error) === 'string' ? error : t('errorUnknownError', {lng}));
    }
  }
}

const initCli = async () => {
  await parseArgs();
  
  const lng = appConfig.getKey(APP_DICTIONARY.lang) ?? 'ru';

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
    const data = await getForecast(city, token, lng);
    if (data) {
      printWeather(data, lng);
    }
  }  
}

initCli();
