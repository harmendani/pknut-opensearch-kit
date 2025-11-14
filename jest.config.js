module.exports = {
  watchPathIgnorePatterns: ['globalConfig'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'node',
  coverageReporters: ['text', 'html'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  collectCoverageFrom: ['src/**/*.js'],
  roots: ['src', 'tests']
}
