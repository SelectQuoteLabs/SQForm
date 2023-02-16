module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)test.+(ts|tsx|js)'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$':
      '<rootDir>/fileTransformer.js',
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!@storybook/addon-docs).+\\.js$'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.dts/'],
};
