const isEmail = value => {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};

const isURL = value => {
  // eslint-disable-next-line max-len
  const re = /(^|[\s.:;?\-\]<(])(https?:\/\/[-\w;/?:@&=+$|_.!~*|'()[\]%#,☺]+[\w/#](\(\))?)(?=$|[\s',|().:;?\-[\]>)])/is;
  return re.test(value);
};

const isRequired = value => {
  if (value === undefined) return false;
  if (value === null) return false;
  value = value + '';
  return value.length > 0;
};

const isDate = value => {
  const dt = new Date(value).toUTCString();
  return /invalid/ig.test(dt) ? false : true;
};

module.exports = {
  isRequired,
  isDate,
  isEmail,
  isURL
};