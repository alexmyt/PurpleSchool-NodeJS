import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { lstatSync, readdirSync } from 'fs';
import { basename, dirname, extname, join } from 'path';

const localesFolder = join(dirname(process.argv[1]), './locales');
const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;

await i18next
  .use(Backend)
  .init({
    debug: false,
    initImmediate: false,
    fallbackLng: 'en',
    preload: readdirSync(localesFolder).filter(fileName => {
      const joinedPath = join(localesFolder, fileName);
      return lstatSync(joinedPath).isFile();
    }).map(fileName => basename(fileName, extname(fileName))),
    backend: {
      loadPath: join(localesFolder, '{{lng}}.json'),
    }
  });

export default (lng) => i18next.getFixedT(lng || systemLocale);
