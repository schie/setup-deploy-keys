module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  // moduleNameMapper: {
  //   '^@src/(.*)$': '<rootDir>/src/$1'
  // },
  // setupFiles: ['dotenv/config'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src']
};
