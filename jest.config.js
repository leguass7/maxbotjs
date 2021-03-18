const { name } = require('./package.json')

module.exports = {
  verbose: true,
  testTimeout: 10000,
  // bail: 2,
  preset: 'ts-jest/presets/js-with-ts',
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules', 'setup*.js', '__tests__', 'dist'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: [
    'dotenv/config'
    // '<rootDir>/jest.setup.js'
  ],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1'
  },
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/__tests__/**/*.(test).{js,jsx,ts,tsx}',
    '<rootDir>/__tests__/**/?(*.)(spec|test).{js,jsx,ts,tsx}'
  ],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],

  displayName: name,
  name
}
