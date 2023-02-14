import { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  verbose: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/server.ts',
    '<rootDir>/src/app.ts',
    '<rootDir>/src/databases',
    '<rootDir>/src/controllers',
    '<rootDir>/src/middlewares',
    '<rootDir>/src/repositories',
    '<rootDir>/src/routes',
    '<rootDir>/src/schemas',
    '<rootDir>/src/utils'
  ]
}

export default config
