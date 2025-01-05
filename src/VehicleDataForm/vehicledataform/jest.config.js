export default {
  preset: "ts-jest",
  testEnvironment: "jest-fixed-jsdom", // React needs a browser-like environment
  testMatch: ["<rootDir>/src/**/*.test.tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Reference your setup file here
  testPathIgnorePatterns: ["/node_modules/"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.app.json", // Point it to your app-specific tsconfig
    },
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy", // To mock CSS imports in tests
  },
};
