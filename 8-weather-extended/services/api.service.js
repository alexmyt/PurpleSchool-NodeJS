import axios from 'axios';

const getWeather = async (city, token, lang) => {
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
