import { times } from 'lodash';

// run factories before importing things being tested
import { FsFactory, PathFactory } from './factories';
const { mkdirSync, appendFileSync } = FsFactory();
const { join } = PathFactory();
import * as path from 'path';

import { createEntry, createSSHConfig } from '../create-ssh-config';

describe('createEntry', () => {
  let input;

  beforeEach(() => {
    input = {
      hostAlias: Math.random().toString(),
      identityFileName: Math.random().toString()
    };
    [mkdirSync, appendFileSync, join].forEach(fn => {
      fn.mockClear();
    });
  });

  it('should exist as a function', () => {
    expect(typeof createEntry).toEqual('function');
  });

  it('should use path.join', () => {
    createEntry(input);
    expect(join).toHaveBeenCalledWith(process.env.HOME, '.ssh', input.identityFileName);
  });

  it('should return a string in expected format', () => {
    expect(createEntry(input)).toEqual(`Host ${input.hostAlias}
    User git
    Hostname github.com
    IdentitiesOnly yes
    IdentityFile ${path.join(process.env.HOME as string, '.ssh', input.identityFileName)}\n\n`);
  });
});

describe('createSSHConfig', () => {
  let numTimes: number;
  let input: any[];
  beforeEach(() => {
    jest.resetModules();
    [join, mkdirSync, appendFileSync].forEach(fn => {
      fn.mockClear();
    });
    numTimes = Math.floor(Math.random() * 10);
    input = times(numTimes, () => ({
      hostAlias: 'some-package',
      identityFileName: 'some_package_id_rsa'
    })) as any;
  });

  it('should exist as a function', async () => {
    expect(typeof createSSHConfig).toEqual('function');
  });

  it('should call fs.mkdirSync', async () => {
    createSSHConfig([{ hostAlias: 'some-package', identityFileName: 'some_package_id_rsa' }]);
    expect(mkdirSync).toBeCalledTimes(1);
    expect(mkdirSync).toHaveBeenCalledWith(expect.any(String), {
      recursive: true
    });
  });

  it('should call fs.appendFileSync for every entry', async () => {
    createSSHConfig(input);

    expect(appendFileSync).toBeCalledTimes(numTimes + 1);
    expect(appendFileSync).toHaveBeenNthCalledWith(
      1,
      expect.any(String),
      'StrictHostKeyChecking no\n\n'
    );
    input.forEach((_, i) => {
      expect(appendFileSync).toHaveBeenNthCalledWith(
        i + 2,
        expect.any(String),
        createEntry(input[i])
      );
    });
  });

  it('should call path.join n + 2 times', () => {
    createSSHConfig(input);
    expect(join).toBeCalledTimes(numTimes + 2);
    expect(join).toHaveBeenNthCalledWith(1, process.env.HOME, '.ssh');
    expect(join).toHaveBeenNthCalledWith(
      2,
      jest.requireActual('path').join(process.env.HOME as string, '.ssh'),
      'config'
    );

    // createEntry(..) runs
    for (let i = 0; i < numTimes; i++) {
      expect(join).toHaveBeenNthCalledWith(
        i + 3,
        process.env.HOME as string,
        '.ssh',
        input[i].identityFileName
      );
    }
  });

  it('should return path of generated file', async () => {
    expect(createSSHConfig([] as any)).toEqual(
      path.join(process.env.HOME as string, '.ssh', 'config')
    );
  });
});
