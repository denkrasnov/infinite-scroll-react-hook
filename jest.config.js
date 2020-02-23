module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx,js}", "!src/**/{__tests__}/**"],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  coveragePathIgnorePatterns: ["!*.d.ts"]
};
