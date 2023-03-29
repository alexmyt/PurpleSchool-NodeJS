if (process.argv.length < 3) {
  help();
  process.exit(1);
}

const delay = process.argv.length > 3 || 'hms'.includes(process.argv[2].at(-1).toLowerCase())
? parseTimeFromArray(process.argv.slice(2))
: parseTimeFromString(process.argv[2]);

console.info(`Set timer to ${delay/1000} seconds`);

setTimeout(() => console.info('Reminder!'), delay);

/**
 * Parse string like '01:01:01' to milliseconds
 *
 * @param {string} strTime
 * @return {number} 
 */
function parseTimeFromString(strTime) {
  const parts = strTime.split(':');
  if (parts.length > 3) {
    help();
    process.exit();
  }

  // [hh, mm, ss] => [ss, mm, hh] => (ss*60^0 + mm*60^1 + hh*60^2) * 1000
  const time = parts.reverse().reduce((acc, part, index) => {
    return acc + parseInt(part) * Math.pow(60, index) * 1000;
  }, 0);

  return time;
}

/**
 * Parse array like ['1h', '1m', '1s'] to milliseconds
 *
 * @param {string[]} parts
 * @return {number} 
 */
function parseTimeFromArray(parts) {
  if (parts.length > 3) {
    help();
    process.exit();
  }

  const partSuffix = 'smh';
  const time = parts.reduce((acc, part) => {
    const partValue = parseInt(part);
    const partSuffixIndex = partSuffix.indexOf(part.at(-1).toLowerCase());

    return acc + partValue * Math.pow(60, partSuffixIndex) * 1000;
  }, 0);

  return time;
}

/**
 * Print help
 */
function help() {
  console.info(`Use: node index.js <time>, where <time> format is one of:
  - Dh Dm Ds
  - D:D:D`);
}
