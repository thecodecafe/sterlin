module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{js,jsx,mjs}',
    'utils/*.{js,jsx,mjs}',
    'routes/*.{js,jsx,mjs}'
  ],
  coverageDirectory: 'coverage'
};