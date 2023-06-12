module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleNameMapper: {
    '\\.(jpeg|ttf|eot|svg)$': '<rootDir>/__mocks__/file-mock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/style-mock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
