const { name } = require('./package.json')

module.exports = {
  verbose: true,
  testTimeout: 10000,
  // bail: 2,
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules', 'setup*.js', '__tests__'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleDirectories: ['node_modules', 'src'],
  // setupFiles: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'node',
  testMatch: [
    // '**/tests/**/*.test.js?(x)'
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],

  displayName: name,
  name
}
