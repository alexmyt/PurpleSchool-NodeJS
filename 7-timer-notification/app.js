const notifier = require('node-notifier');

const { parseTimeFromArray, parseTimeFromString, help } = require('./time-parser');

if (process.argv.length < 3) {
  help();
  process.exit(1);
}

const delay = process.argv.length > 3 || 'hms'.includes(process.argv[2].at(-1).toLowerCase())
? parseTimeFromArray(process.argv.slice(2))
: parseTimeFromString(process.argv[2]);

console.info(`Set timer to ${delay/1000} seconds`);

setTimeout(() => notifier.notify({sound: true, title: 'Reminder', message: `It's time now!`}), delay);
