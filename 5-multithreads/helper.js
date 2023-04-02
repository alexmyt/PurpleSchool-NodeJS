/**
 * @param {number} [cnt=300000]
 * @return {number[]} 
 */
function getArray(cnt = 300000) {
  const ret = new Array(cnt);
  for(let ind = 0; ind < ret.length; ind++) {
    ret[ind] = ind+1;
  }
  return ret;
}

/**
 * @param {number[]} arr
 * @param {number} [from=0]
 * @param {number} [to=undefined]
 * @return {number} 
 */
function count(arr, from = 0, to = undefined) {
  if (to === undefined) {
    to = arr.length - 1;
  } else {
    to = Math.min(to, arr.length - 1);
  }

  let cnt = 0;
  for(let i = from; i <= to; i++) {
    const val = arr[i];
    if (val % 3 === 0) {
      cnt++;
    }
  }

  return cnt;
};

module.exports = { getArray, count};
