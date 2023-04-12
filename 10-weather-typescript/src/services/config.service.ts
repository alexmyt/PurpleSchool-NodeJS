import { promises, constants } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const defaultConfigFile = join(homedir(), '.weather-data.json');

const APP_DICTIONARY = {
  token: 'token',
  city: 'city',
  lang: 'lang',
};

class Config {
  data: {[index: string]: string} = {};
  configFile = '';

  constructor(configFile: string) {
    this.configFile = configFile;
  }

  readConfig = async () => {
    if (await this.isExist(this.configFile)) {
      this.data = JSON.parse(await promises.readFile(this.configFile, {encoding: 'utf-8'}));
    }
  }

  saveConfig = async () => {
    await promises.writeFile(this.configFile, JSON.stringify(this.data), {encoding: 'utf-8'});
  }

  setKey = (key: string, value: string) => {
    this.data[key] = value;
  }

  getKey = (key: string) => {
    return this.data[key];
  }

  isExist = async (path: string) => {
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