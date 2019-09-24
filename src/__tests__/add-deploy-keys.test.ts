import { times } from 'lodash';
import { PathFactory, FsFactory } from './factories';
const { join } = PathFactory();
const { mkdirSync, writeFileSync, chmodSync, constants } = FsFactory();

import { addDeployKeys } from '../add-deploy-keys';

describe('addDeployKeys()', () => {
  let numTimes: number;
  let input: any[];
  const sshPath = Object.freeze(
    jest.requireActual('path').join(process.env.HOME as string, '.ssh')
  );
  beforeEach(() => {
    numTimes = Math.floor(Math.random() * 10);
    input = times(numTimes, () => ({
      privateKey: Math.random().toString(),
      identityFileName: Math.random().toString()
    }));
    jest.resetModules();
    [join, mkdirSync, writeFileSync, chmodSync].forEach(fn => {
      fn.mockClear();
    });
  });

  it('should exist as a function', () => {
    expect(typeof addDeployKeys).toEqual('function');
  });

  it('should attempt to recursively make ssh dir', () => {
    addDeployKeys(input);

    expect(mkdirSync).toHaveBeenCalledWith(sshPath, { recursive: true });
  });

  it('should attempt to use path.join n + 1 times', () => {
    addDeployKeys(input);
    expect(join).toBeCalledTimes(numTimes + 1);
    expect(join).toHaveBeenNthCalledWith(1, process.env.HOME, '.ssh');
    for (let i = 2; i <= numTimes + 1; i++) {
      expect(join).toHaveBeenNthCalledWith(i, sshPath, input[i - 2].identityFileName);
    }
  });

  it('should attempt to use fs.writeFileSync n times', () => {
    addDeployKeys(input);
    expect(writeFileSync).toBeCalledTimes(numTimes);
    for (let i = 1; i <= numTimes; i++) {
      const { identityFileName, privateKey } = input[i - 1];
      const filePath = jest.requireActual('path').join(sshPath, identityFileName);
      expect(writeFileSync).toHaveBeenNthCalledWith(i, filePath, privateKey);
    }
  });

  it('should attempt to use fs.chmodSync n times', () => {
    addDeployKeys(input);
    expect(chmodSync).toBeCalledTimes(numTimes);
    for (let i = 1; i <= numTimes; i++) {
      const { identityFileName } = input[i - 1];
      const filePath = jest.requireActual('path').join(sshPath, identityFileName);
      expect(chmodSync).toHaveBeenNthCalledWith(i, filePath, constants.S_IRUSR);
    }
  });
});
