import { APP_DICTIONARY, getKeyValue } from './storage.service.js';
import axios from 'axios';

const getWeather = async (city, lang='ru') => {
  const token = process.env.TOKEN ?? await getKeyValue(APP_DICTIONARY.token);
  if (!token) {
    throw new Error('Не задан ключ API');
  }

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: lang,
      units: 'metric'
    }
  });

  return data;
}

export { getWeather }
