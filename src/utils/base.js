
/**
 * @description: 生成两数之间的随机整数，包括两个数在内
 * @param {*} min
 * @param {*} max
 * @return {*}
 */
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}
