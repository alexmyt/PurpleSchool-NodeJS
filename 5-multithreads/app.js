const { cpus } = require('node:os');
const { performance, PerformanceObserver } = require('node:perf_hooks');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');

const { getArray, count } = require('./helper');

const arraySize = 300 * 1000;

if (isMainThread) {
  const performanceObserver = new PerformanceObserver((list, observer) => {
    list.getEntries().forEach(entry => {
      console.log(`${entry.name} : ${entry.duration}`);
    });
  });

  performanceObserver.observe({ entryTypes: ['measure', 'function']});

  const arr = getArray(arraySize);
  console.log(count(arr));
  
  const threadsCnt = process.argv[2] || cpus().length;
  const perfThreaded = performance.timerify(countThreaded);
  perfThreaded(arr, threadsCnt).then(res => {
    console.log(res);
  });

} else {
  const { arr, chunkFrom, chunkTo } = workerData;
  parentPort.postMessage(count(arr, chunkFrom, chunkTo));
}

/**
 * @param {number[]} arr
 * @param {number} [threads=4]
 */
async function countThreaded(arr, threads = 4) {
  const chunks = [];

  for (let i = 1; i <= threads; i++) {
    const chunk = Math.floor(arr.length / threads);
    const chunkFrom = i === 1 ? 0 : chunk * (i - 1) + 1;

    const chunkTo = i === threads
      ? arr.length
      : chunk * i;

    const chunkWorker = new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { arr, chunkFrom, chunkTo }
      });
  
      worker.on('message', resolve);
      
      worker.on('error', reject);
      
      worker.on('exit', code => {
        if (code !== 0) {
          console.log(`Worker #${worker.threadId} exited with code ${code}`);
          reject;
        }
      });

      worker.on('online', () => console.log(`Worker #${worker.threadId} has started.`));
    });

    chunks.push(chunkWorker);
  }

  return await Promise.all(chunks).then(results => {
    return results.reduce((el, cnt) => {return cnt+=el}, 0);
  });
}