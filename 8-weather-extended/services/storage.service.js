import { promises, constants } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const filePath = join(homedir(), '.weather-data.json');

const APP_DICTIONARY = {
  token: 'token',
  city: 'city',
  lang: 'lang',
};

const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
}

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
}

const isExist = async (path) => {
  try {
    await promises.access(filePath, constants.R_OK);
    return true;
  } catch (e) {
    return false;
  }
}

export { saveKeyValue, getKeyValue, APP_DICTIONARY}