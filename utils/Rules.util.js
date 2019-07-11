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

const is24HourTime = value => {
  var re = /^\d\d:\d\d(:\d\d)?$/;
  return re.test(value);
};

const is12HourTime = value => {
  var re = /^\d\d:\d\d(am|pm|AM|PM)?$/;
  return re.test(value);
};

const isTime = value => {
  return is24HourTime(value) || is12HourTime(value);
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

const isTrue = value => {
  return value === true || value === 1;
};

const isFalse = value => {
  return value === false || value === 0;
};

const maxLength = length => value => {
  if (typeof value !== 'string') return false;
  return value && value.length <= length;
};

const minLength = length => value => {
  if (typeof value !== 'string') return false;
  return value && value.length >= length;
};

const isBetweenLength = (min, max) => value => {
  if (typeof value !== 'string') return false;
  return minLength(min)(value) && maxLength(max)(value);
};

const isMatch = first => value => {
  return value === first;
};

const isNotMatch = first => value => {
  return value !== first;
};

const max = limit => value => {
  return value <= limit;
};

const min = limit => value => {
  return value >= limit;
};

const isBetween = (min, max) => value => {
  if (typeof value !== 'string') return false;
  return min(min)(value) && max(max)(value);
};

const isIn = list => value => {
  return list.indexOf(value) !== -1 ? true : false;
};

const isDate = value => {
  return String(new Date(value).getTime())
    .trim()
    .toLowerCase() !== 'invalid date';
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
  isTrue,
  isFalse,
  isDate,
  isBeforeDate,
  isAfterDate,
  isBetweenDate,
  isIn,
  min,
  max,
  isBetween,
  minLength,
  maxLength,
  isBetweenLength,
  is12HourTime,
  is24HourTime,
  isTime,
  isEmail,
  isNunber,
  isMatch,
  isNotMatch,
  isURL
};