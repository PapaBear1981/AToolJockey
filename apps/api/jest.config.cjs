const base = require('../../packages/config/jest/base.cjs');

module.exports = {
  ...base,
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
