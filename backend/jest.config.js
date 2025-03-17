export default {
  preset: 'ts-jest/presets/default-esm', // Use ts-jest with ESM support
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  testMatch: ['**/__tests__/**/*.ts'],
  globalSetup: '<rootDir>/src/test/globalSetup.ts',
  globalTeardown: '<rootDir>/src/test/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/src/test/setupFileAfterEnv.ts'],
  // Node.js ESM rules require to use .js extension for imports
  // however, ts-jest rules omit .js extension for imports

  // This configuration removes .js extension from imports
  // end Jest doesn't complain about it
  moduleNameMapper: {
    '(.+)\\.js': '$1',
  },
}
