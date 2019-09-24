module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  // moduleNameMapper: {
  //   '^@src/(.*)$': '<rootDir>/src/$1'
  // },
  // setupFiles: ['dotenv/config'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/factories.ts']
};
