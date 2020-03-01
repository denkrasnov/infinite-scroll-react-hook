module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  preset: "ts-jest",
  collectCoverageFrom: ["src/**/*.{ts,tsx,js}", "!src/**/{__tests__}/**"],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  coveragePathIgnorePatterns: [
    "!*.d.ts",
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ]
};
