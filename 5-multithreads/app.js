const {performance, PerformanceObserver} = require('node:perf_hooks');
const {getArray, count} = require('./helper');

const performanceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log(`${entry.name} : ${entry.duration}`);
  });

  performance.clearMarks();
  performance.clearMeasures();
  performanceObserver.disconnect();
});

performanceObserver.observe({ entryTypes: ['function']});

const arr = getArray();

const countSingle = performance.timerify(count);
console.log(countSingle(arr));

const perfThreaded = performance.timerify(countThreaded);
perfThreaded(arr).then(res => console.log(res));


/**
 * @param {number[]} arr
 * @param {number} [threads=4]
 */
function countThreaded(arr, threads = 4) {
  const chunks = [];

  for (let i = 1; i <= threads; i++) {
    const chunk = Math.floor(arr.length / threads);
    const chunkFrom = i === 1 ? 0 : chunk * (i - 1) + 1;

    const chunkTo = i === threads
      ? arr.length
      : chunk * i;

    chunks.push(new Promise(resolve => resolve(count(arr, chunkFrom, chunkTo))));
  }

  return Promise.all(chunks).then(results => results.reduce((el, cnt) => {return cnt+=el}, 0));
}