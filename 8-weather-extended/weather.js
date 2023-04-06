#!/usr/bin/env node
import { AxiosError } from 'axios';
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { APP_DICTIONARY, getKeyValue, saveKeyValue } from './services/storage.service.js';
import { printWeather } from './services/weather.service.js';

const saveToken = async (token) => {
  if (Array.isArray(token)) {
    printError('Допустимо передавать только один токен');
    return;
  }

  if (typeof(token) !== 'string' || !token.length) {
    printError('Токен не передан');
    return;
  }

  try {
    await saveKeyValue(APP_DICTIONARY.token, token);
    printSuccess('Токен сохранен');
  } catch (error) {
    printError(error.message);
  }
}

const saveCity = async (city) => {
  if (typeof(city) !== 'string' && !Array.isArray(city) || !city.length) {
    printError('Город не передан');
    return;
  }

  try {
    await saveKeyValue(APP_DICTIONARY.city, city);
    printSuccess('Город сохранен');
  } catch (error) {
    printError(error.message);
  }
}

const saveLang = async (lang) => {
  if (Array.isArray(lang)) {
    printError('Допустимо передавать только один язык');
    return;
  }

  if (typeof(lang) !== 'string' || !lang.length) {
    printError('Язык не передан');
    return;
  }

  try {
    await saveKeyValue(APP_DICTIONARY.lang, lang);
    printSuccess('Язык сохранен');
  } catch (error) {
    printError(error.message);
  }
}

const getForecast = async (city, lang = 'ru') => {
  try {
    const res = await getWeather(city, lang);
    printWeather(res, lang);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        printError(`Неправильно указан город: ${city}`);
      } else if (error.response?.status === 401) {
        printError('Неправильно указан токен');
      }
      printError(error.response?.data.message);
    } else {
      printError(error?.message);
    }
  }
}

const initCLI = async () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.l) {
    saveLang(args.l);
  }

  if (args.t) {
    saveToken(args.t);
  }

  if (args.s) {
    saveCity(args.s)
  }

  const lang = process.env.WEATHER_LANG ?? args.l ?? await getKeyValue(APP_DICTIONARY.lang) ?? 'ru';
  
  const cities = process.env.CITY ?? args.s ?? await getKeyValue(APP_DICTIONARY.city);
  if (Array.isArray(cities)) {
    for(const city of cities) {
      getForecast(city, lang);
    }
  } else {
    getForecast(cities, lang);
  }
}

initCLI();
