import { AxiosError } from "axios";

import { APP_DICTIONARY, appConfig } from "./config.service.js";
import { getWeather } from "./weather.service.js";

const get = async (req, resp, next) => {
  
  const lang = req.query[APP_DICTIONARY.lang] ?? appConfig.getKey(APP_DICTIONARY.lang) ?? 'ru';
  const token = req.query[APP_DICTIONARY.token] ?? appConfig.getKey(APP_DICTIONARY.token);
  const city = req.query[APP_DICTIONARY.city] ?? appConfig.getKey(APP_DICTIONARY.city);
  
  if (!city) {
    return next(new Error('City not defined'));
  }

  if (!token) {
    return next(new Error('Token not defined'));
  }

  try {
    let data;
    if (Array.isArray(city)) {
      data = [];
      for (const curCity of city) {
        data.push(await getWeather(curCity, token, lang));
      }
    } else {
      data = await getWeather(city, token, lang);
    }
    resp.json(data);
  } catch(err) {
    if (err instanceof AxiosError) {
      next(new Error(err.response?.data?.message))
    } else {
      next(err);
    }
  }
}

export { get }
