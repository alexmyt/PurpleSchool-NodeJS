import { APP_DICTIONARY, appConfig } from "./config.service.js";

const get = (req, resp) => {
  return resp.json(appConfig.data);
}

const put = async (req, resp, next) => {

  for (const key of Object.keys(APP_DICTIONARY)) {
    if (req.body[key]) {
      appConfig.setKey(key, req.body[key]);
    }
  }

  appConfig.saveConfig()
    .then(resp.json(appConfig.data))
    .catch(e => next(e));
}

export { get, put }
