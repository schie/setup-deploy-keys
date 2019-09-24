export function PathFactory() {
  const path = {
    __esModule: true,
    join: jest.fn().mockImplementation(jest.requireActual('path').join)
  };
  jest.mock('path', () => path);
  return path;
}

export function FsFactory() {
  const fs = {
    __esModule: true,
    mkdirSync: jest.fn(),
    appendFileSync: jest.fn(),
    writeFileSync: jest.fn(),
    chmodSync: jest.fn(),
    constants: jest.requireActual('fs').constants
  };

  jest.mock('fs', () => fs);

  return fs;
}

export function LodashFactory() {
  const lodash = {
    __esModule: true,
    snakeCase: jest.fn().mockImplementation(jest.requireActual('lodash').snakeCase)
  };

  jest.mock('lodash', () => lodash);
  return lodash;
}
