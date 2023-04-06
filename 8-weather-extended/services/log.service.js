import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.error(chalk.bgRed(' ERROR '), error);
}

const printSuccess = (message) => {
  console.info(chalk.bgGreen(' SUCCESS '), message);
}

const printHelp = () => {
  console.info(dedent`${chalk.bgCyanBright(' HELP ')}
    Без параметров - вывод погоды 
    -h для вывода справки
    -s [CITY] для установки города
    -t [API_KEY] для установки токена
    -l [ru|en] для установки языка`);
}

export { printError, printSuccess, printHelp };
