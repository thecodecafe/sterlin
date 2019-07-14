const { hash, hashCompare } = require('../../utils/Hashing.util');

describe('<Hashing>', () => {

  it('should hash a password when passed a string', (done) => {
    const password = hash('password');
    expect(typeof(password)).toBe('string');
    done();
  });

  it('should throw an erro when not passed a string', () => {
    expect(hash).toThrow('Please supply a string to be hashed.');
  });

  it('should be truthy when comparing same passwords',  () => {
    const password = 'password';
    expect(hashCompare(password, hash(password))).toBeTruthy();
  });

  it('should not be truthy when comparing different passwords',  () => {
    const password = 'password';
    expect(hashCompare(password, hash('fake-password'))).toBeFalsy();
  });
});