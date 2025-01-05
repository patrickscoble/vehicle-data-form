// jest.setup.js
require("@testing-library/jest-dom"); // For extended Jest matchers

// Mock CSS imports
jest.mock("*.css", () => {});
