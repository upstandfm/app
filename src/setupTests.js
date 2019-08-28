// NOTE: this file must be named "setupTests.js"
// For more info see:
// https://create-react-app.dev/docs/running-tests#initializing-test-environment

// Adds "jest-dom" custom assertions
// For more info see:
// https://github.com/testing-library/jest-dom#custom-matchers
import '@testing-library/jest-dom/extend-expect';

// Mocked globals

// Required for "src/hooks/use-match-media.js"
window.matchMedia = jest.fn(q => {
  return {
    matches: false,
    media: q,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
});
