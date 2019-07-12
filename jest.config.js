module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/__tests__\/stubs/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{js,jsx,mjs}',
    'utils/*.{js,jsx,mjs}',
    'routes/*.{js,jsx,mjs}'
  ],
  coverageDirectory: 'coverage'
};