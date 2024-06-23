// Generated with `npm init jest@latest` and updated as described in https://nextjs.org/docs/app/building-your-application/testing/jest 

const nextJest = require('next/jest')

const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

module.exports = createJestConfig(config)
