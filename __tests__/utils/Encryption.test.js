require('../../configs/dotenv');
const {encrypto, decrypto} = require('../../utils/Encryption.util');

describe('<Encryption.encrypto>', () => {
  describe('Encrypto', () => {
    it('should encrypt a given data', () => {
      expect(encrypto('string')).toBeDefined();
    });

    it('should encrypt string', () => {
      const data = 'password';
      const encrypted = encrypto(data);
      expect(encrypted).toBeDefined();
      expect(encrypted).not.toBe(data);
      expect(typeof(encrypted)).toBe('string');
    });

    it('should encrypt number', () => {
      const data = 348734;
      const encrypted = encrypto(data);
      expect(encrypted).toBeDefined();
      expect(encrypted).not.toBe(data);
      expect(typeof(encrypted)).toBe('string');
    });

    it('should encrypt array', () => {
      const data = [4, 5];
      const encrypted = encrypto(data);
      expect(encrypted).toBeDefined();
      expect(encrypted).not.toBe(data);
      expect(typeof(encrypted)).toBe('string');
    });

    it('should encrypt object', () => {
      const data = {name: 'Jon'};
      const encrypted = encrypto(data);
      expect(encrypted).toBeDefined();
      expect(encrypted).not.toBe(data);
      expect(typeof(encrypted)).toBe('string');
    });

    it('should encrypt boolean', () => {
      const data = true;
      const encrypted = encrypto(data);
      expect(encrypted).toBeDefined();
      expect(encrypted).not.toBe(data);
      expect(typeof(encrypted)).toBe('string');
    });

    it('should not encrypt null or undefined', () => {
      expect(encrypto(null)).toBe(null);
      expect(encrypto()).toBe(null);
    });
  });

  describe('Encrypto', () => {
    let encrypted;
    const defaultData = 'something';

    beforeEach(() => {
      encrypted = encrypto(defaultData);
    });

    it('should encrypt a given data', () => {
      expect(decrypto(encrypted)).toBeDefined();
    });

    it('should encrypt string', () => {
      expect(decrypto(encrypted)).toStrictEqual(defaultData);
    });

    it('should encrypt number', () => {
      const data = 348734;
      encrypted = encrypto(data);
      expect(decrypto(encrypted)).toStrictEqual(data);
    });

    it('should encrypt array', () => {
      const data = [4, 5];
      encrypted = encrypto(data);
      expect(decrypto(encrypted)).toStrictEqual(data);
    });

    it('should encrypt object', () => {
      const data = {name: 'Jon'};
      encrypted = encrypto(data);
      expect(decrypto(encrypted)).toStrictEqual(data);
    });

    it('should encrypt boolean', () => {
      const data = true;
      encrypted = encrypto(data);
      expect(decrypto(encrypted)).toStrictEqual(data);
    });

    it('should not encrypt null or undefined', () => {
      expect(decrypto(null)).toBe(null);
      expect(decrypto()).toBe(null);
      expect(decrypto(2)).toBe(null);
      expect(decrypto(true)).toBe(null);
      expect(decrypto([])).toBe(null);
      expect(decrypto({})).toBe(null);
      expect(decrypto('')).toBe(null);
      expect(decrypto(String('  '))).toBe(null);
    });
  });
});