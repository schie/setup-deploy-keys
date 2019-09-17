import * as path from 'path';
import { times } from 'lodash';

import { createEntry } from '../create-ssh-config';

describe('createEntry', () => {
  it('should exist as a function', () => {
    expect(typeof createEntry).toEqual('function');
  });

  it('should return a string in expected format', () => {
    const input = {
      hostAlias: Math.random().toString(),
      identityFileName: Math.random().toString()
    };
    expect(createEntry(input)).toEqual(`Host ${input.hostAlias}.github.com
    User git
    Hostname github.com
    IdentitiesOnly yes
    IdentityFile ${path.join(
      process.env.HOME as string,
      '.ssh',
      input.identityFileName
    )}\n`);
  });
});

describe('createSSHConfig', () => {
  let fsMock;

  beforeAll(() => {});

  beforeEach(() => {
    jest.resetModules();
    fsMock = {
      __esModule: true,
      mkdirSync: jest.fn(),
      appendFileSync: jest.fn()
    };
    jest.doMock('fs', () => fsMock);
  });

  it('should exist as a function', async () => {
    const { createSSHConfig } = await import('../create-ssh-config');
    expect(typeof createSSHConfig).toEqual('function');
  });

  it('should call fs.mkdirSync', async () => {
    const { createSSHConfig } = await import('../create-ssh-config');
    createSSHConfig([
      { hostAlias: 'some-package', identityFileName: 'some_package_id_rsa' }
    ]);
    expect(fsMock.mkdirSync).toBeCalledTimes(1);
    expect(fsMock.mkdirSync).toHaveBeenCalledWith(expect.any(String), {
      recursive: true
    });
  });

  it('should call fs.appendFileSync for every entry', async () => {
    const { createSSHConfig } = await import('../create-ssh-config');
    const numTimes = Math.floor(Math.random() * 10);
    const input = times(numTimes, () => ({
      hostAlias: 'some-package',
      identityFileName: 'some_package_id_rsa'
    })) as any;

    createSSHConfig(input);

    expect(fsMock.appendFileSync).toBeCalledTimes(numTimes);

    input.forEach((element, i) => {
      expect(fsMock.appendFileSync).toHaveBeenNthCalledWith(
        i + 1,
        expect.any(String),
        createEntry(input[i])
      );
    });
  });

  it('should return path of generated file', async () => {
    const { createSSHConfig } = await import('../create-ssh-config');
    expect(createSSHConfig([] as any)).toEqual(
      path.join(process.env.HOME as string, '.ssh', 'config')
    );
  });
});
