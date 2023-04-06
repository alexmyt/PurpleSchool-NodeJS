/**
 * Parse program arguments. Return object with arguments names and values
 * 
 * @param {string[]} argv
 * @return {object}
 */
const getArgs = (argv) => {
  const res = {};
  argv.forEach((value, index) => {
    if (value.charAt(0) === '-') {
      const param = value.substring(1);
      if (index < argv.length -1 && argv[index + 1].charAt(0) !== '-') {
        addArg(res, param, argv[index + 1]);
      } else {
        addArg(res, param, true);
      }
    }
  });

  return res;
}

/**
 * @param {string[]|string[][]} args
 * @param {string} name
 * @param {string} value
 */
const addArg = (args, name, value) => {
  if(name in args) {
    if (Array.isArray(args[name])) {
      args[name].push(value);
    } else {
      args[name] = [args[name], value];
    }
  } else {
    args[name] = value;
  }
}

export { getArgs }
