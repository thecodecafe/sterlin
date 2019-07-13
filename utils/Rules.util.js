const isEmail = value => {
  if (typeof value === 'string' && value.length < 1) return true;
  // eslint-disable-next-line max-len
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};

const isURL = value => {
  if (typeof value === 'string' && value.length < 1) return true;
  // eslint-disable-next-line max-len
  const re = /^(https?|ftp):\/\/(-\.)?([^\s/?.#-]+\.?)+(\/[^\s]*)?$/is;
  return re.test(value);
};

const isNunber = value => {
  var re = /^[0-9\b]*(\.[0-9]*)?$/im;
  return re.test(value);
};

const isRequired = value => {
  if (value === undefined) return false;
  if (value === null) return false;
  value = value + '';
  return value.length > 0;
};

const isRequiredWith = parent => value => {
  if (!isRequired(parent)) {
    return true;
  }
  return isRequired(value);
};

const isDate = value => {
  const dt = new Date(value).toUTCString();
  return /invalid/ig.test(dt) ? false : true;
};

const isAfterDate = start => {
  // stop if start is not a valid date
  if (!isDate(start)) return false;
  // return falidator
  return value => {
    // stop if valid is not a valid date
    if (!isDate(value)) return false;
    // get start time
    const startTime = new Date(start).getTime();
    // get time from value passed
    const time = new Date(value).getTime();
    // check if value time is greater than start time
    return time > startTime;
  };
};

const isBeforeDate = limit => {
  // stop if limit is not a valid date
  if (!isDate(limit)) return false;
  // return validator
  return value => {
    // stop if valid is not a valid date
    if (!isDate(value)) return false;
    // get limit time
    const limitTime = new Date(limit).getTime();
    // get time from value passed
    const time = new Date(value).getTime();
    // check if value time is greater than limit time
    return time < limitTime;
  };
};

const isBetweenDate = (start, end) => {
  // stop if limit is not a valid date
  if (!isDate(start) || !isDate(end)) return false;
  // return validator
  return value => {
    // validate value
    return isAfterDate(start)(value) && isBeforeDate(end)(value);
  };
};

module.exports = {
  isRequired,
  isRequiredWith,
  isDate,
  isBeforeDate,
  isAfterDate,
  isBetweenDate,
  isEmail,
  isNunber,
  isURL
};