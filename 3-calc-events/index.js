const EventEmitter = require('events');

if (process.argv.length !== 5) {
  console.error('Use: node index.js <number1> <number2> <operation>');
  process.exit(1);
}

const [execPath, indexPath, firstNum, secondNum, operationName] = process.argv;

const calcEmitter = new EventEmitter();

calcEmitter.on('result', result => console.info(result));
calcEmitter.on('add', (a, b) => calcEmitter.emit('result', a + b));
calcEmitter.on('subtract', (a, b) => calcEmitter.emit('result', a - b));
calcEmitter.on('multiply', (a, b) => calcEmitter.emit('result', a * b));
calcEmitter.on('divide', (a, b) => calcEmitter.emit('result', a / b));

const operationNames = calcEmitter.eventNames().filter(eventName => eventName !== 'result');
if (!operationNames.includes(operationName)) {
  console.error(`Operation <${operationName}> is not supported. Valid operations is: ${operationNames.join(', ')}`);
  process.exit(1);
}

calcEmitter.emit(operationName, +firstNum, +secondNum);