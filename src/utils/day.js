import { getRandomIntInclusive } from './base';

class Day {
  constructor(initDate) {
    this.initDate = initDate;
  }
  add(n, type) {
    if (!n) return this;
    switch (type) {
      case 'day':
      case 'd':
      case 'D':
        const addSeconds = 24 * 60 * 60 * n;
        const addSecondsTime = this.initDate.getTime() / 1000 + addSeconds;
        this.initDate = new Date(addSecondsTime * 1000);
        break;
      case 'hour':
      case 'h':
        const addHour = 60 * 60 * n;
        const addHourTime = this.initDate.getTime() / 1000 + addHour;
        this.initDate = new Date(addHourTime * 1000);
        break;
      default:
        throw (`the type '${type}' is not support`);
    }
    return this;
  }
  subtract(n, type) {
    this.add(-1 * n, type);
    return this;
  }
  setHours(min = 0, max = 24) {
    const randomHour = getRandomIntInclusive(min, max);
    this.initDate = new Date(new Date(this.initDate).setHours(randomHour));
    return this;
  }
  setMinutes(min = 0, max = 60) {
    const randomMinutes = getRandomIntInclusive(min, max);
    this.initDate = new Date(new Date(this.initDate).setMinutes(randomMinutes));
    return this;
  }
  setSeconds(min = 0, max = 60) {
    const randomSeconds = getRandomIntInclusive(min, max);
    this.initDate = new Date(new Date(this.initDate).setSeconds(randomSeconds));
    return this;
  }
  format(type = 'YYYY-MM-DD') {
    const tMap = this._currentTime();
    let result = type;
    for (let key in tMap) {
      result = result.replace(key, tMap[key]);
    }
    return result;
  }
  _prefix(val) {
    return val < 10 ? `0${val}` : val;
  }
  _currentTime() {
    const d = this.initDate;
    return {
      'YYYY': d.getFullYear(),
      'MM': this._prefix(d.getMonth() + 1),
      'DD': this._prefix(d.getDate()),
      'hh': this._prefix(d.getHours()),
      'mm': this._prefix(d.getMinutes()),
      'ss': this._prefix(d.getSeconds()),
    }
  }
}

export function day(initDate = new Date()) {
  return new Day(initDate);
}

export default day;
