const { isDate, isEmail, isRequired, isURL } = require('../../utils/Rules.util');

describe('<Rules.isDate>', () => {
  it('should pass', () => {
    expect(isDate('12/25/2018')).toBe(true);
    expect(isDate('12/25/2018 17:40')).toBe(true);
    expect(isDate('12/25/2018 05:40 PM')).toBe(true);
    expect(isDate('2018-11-22')).toBe(true);
    expect(isDate('2018-11-22 17:40')).toBe(true);
    expect(isDate('2018-11-22 05:40 PM')).toBe(true);
  });

  it('should fail', () => {
    expect(isDate('25/12/2018')).toBe(false);
    expect(isDate('25/12/2018 17:40')).toBe(false);
    expect(isDate('25/12/2018 05:40 PM')).toBe(false);
    expect(isDate('2018-22-11')).toBe(false);
    expect(isDate('2018-22-11 17:40')).toBe(false);
    expect(isDate('2018-22-11 05:40 PM')).toBe(false);
    expect(isDate('date')).toBe(false);
  });
});

describe('<Rules.isEmail>', () => {
  it('should pass', () => {
    expect(isEmail('email@example.com')).toBe(true);
  });

  it('should fail', () => {
    expect(isEmail('')).toBe(false);
    expect(isEmail('google.com')).toBe(false);
    expect(isEmail('email@example')).toBe(false);
    expect(isEmail('email')).toBe(false);
  });
});

describe('<Rules.isRequired>', () => {
  it('should pass', () => {
    expect(isRequired('word')).toBe(true);
    expect(isRequired(2)).toBe(true);
  });

  it('should fail', () => {
    expect(isRequired()).toBe(false);
    expect(isRequired(undefined)).toBe(false);
    expect(isRequired(null)).toBe(false);
    expect(isRequired('')).toBe(false);
  });
});

describe('<Rules.isURL>', () => {
  it('should pass', () => {
    expect(isURL('http://google.com')).toBe(true);
    expect(isURL('http://google.com/images')).toBe(true);
    expect(isURL('http://google.com/images/image.jpg')).toBe(true);
    expect(isURL('http://google.com?search=hey')).toBe(true);
    expect(isURL('http://google.com?search=hey&foo=bar')).toBe(true);
    expect(isURL('https://google.com')).toBe(true);
    expect(isURL('https://google.com/images')).toBe(true);
    expect(isURL('https://google.com/images/image.jpg')).toBe(true);
    expect(isURL('https://google.com?search=hey')).toBe(true);
    expect(isURL('https://google.com?search=hey&foo=bar')).toBe(true);
  });

  it('should fail', () => {
    expect(isURL('//google.com')).toBe(false);
    expect(isURL('google.com/images')).toBe(false);
    expect(isURL('www.google.com/images/image.jpg')).toBe(false);
    expect(isURL('www.google.com?search=hey')).toBe(false);
    expect(isURL('www.google.com?search=hey&foo=bar')).toBe(false);
  });
});