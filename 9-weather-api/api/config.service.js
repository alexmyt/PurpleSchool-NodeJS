import { promises, constants } from 'fs';
import { dirname, join } from 'path';

const defaultConfigFile = new URL('../.weather.json', import.meta.url);

const APP_DICTIONARY = {
  token: 'token',
  city: 'city',
  lang: 'lang',
};

class Config {
  data = {};
  configFile = '';

  constructor(configFile) {
    this.configFile = configFile;
  }

  readConfig = async () => {
    if (await this.isExist(this.configFile)) {
      this.data = JSON.parse(await promises.readFile(this.configFile));
    }
  }

  saveConfig = async () => {
    await promises.writeFile(this.configFile, JSON.stringify(this.data));
  }

  setKey = (key, value) => {
    this.data[key] = value;
  }

  getKey = (key) => {
    return this.data[key];
  }

  isExist = async (path) => {
    try {
      await promises.access(path, constants.R_OK);
      return true;
    } catch (e) {
      return false;
    }
  }
}

const appConfig = new Config(defaultConfigFile);

export {APP_DICTIONARY, appConfig};
