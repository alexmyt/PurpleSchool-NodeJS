const fs = require('fs');
const { join } = require('path');

if (process.argv.length !== 5) {
  console.error('Use: node index.js <number1> <number2> <operation>');
  process.exit(1);
}

const [execPath, indexPath, firstNum, secondNum, operationName] = process.argv;

const operationFile = join(__dirname, `${operationName}.js`);

fs.access(operationFile, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`Operation file <${operationFile}> is not exists`);
    process.exit(1);
  }

  const operation = require(operationFile);

  let result;
  try {
    result = operation.exec(+firstNum, +secondNum);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  console.info(result);
});
