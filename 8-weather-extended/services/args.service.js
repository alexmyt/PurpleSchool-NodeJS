import { Option, program } from 'commander';

import { APP_DICTIONARY, appConfig } from './config.service.js';
import { printHelp } from './console.service.js';

const langs = ['ru', 'en', 'de'];

const parseArgs = async () => {
  program
  .version('0.0.1')
  .addOption(new Option('-f, --file [configFile]').env('WEATHER_FILE'))
  .addOption(new Option('-c, --city [city...]').env('WEATHER_CITY'))
  .addOption(new Option('-l, --lang [lang]').choices(langs).env('WEATHER_LANG'))
  .addOption(new Option('-t, --token [token]').env('WEATHER_TOKEN'))
  .addOption(new Option('-s, --save'))
  .addOption(new Option('-h, --help'));

  const opts = program.parse(process.argv).opts();

  if (opts.file) {
    appConfig.configFile = opts.file;
  }

  await appConfig.readConfig();

  if (opts.lang) {
    appConfig.setKey(APP_DICTIONARY.lang, opts.lang);
  };

  if (opts.help) {
    printHelp(appConfig.getKey(APP_DICTIONARY.lang));
    process.exit(0);
  }

  if (opts.token) {
    appConfig.setKey(APP_DICTIONARY.token, opts.token);
  }

  if (opts.city) {
    appConfig.setKey(APP_DICTIONARY.city, opts.city);
  }

  if (opts.save) {
    await appConfig.saveConfig();
  }
}

export { parseArgs }
