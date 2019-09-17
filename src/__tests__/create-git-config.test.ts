import * as path from 'path';
import { times } from 'lodash';

import { createEntry } from '../create-git-config';

describe('createEntry', () => {
  it('should exist as a function', () => {
    expect(typeof createEntry).toEqual('function');
  });

  it('should return a string in expected format', () => {
    const packageName = Math.floor(Math.random() * 100).toString();
    const ownerName = Math.floor(Math.random() * 100).toString();
    expect(createEntry({ packageName, ownerName }))
      .toEqual(`[url "git@${packageName}.github.com:${ownerName}/${packageName}"]
    insteadOf = https://github.com/${ownerName}/${packageName}\n`);
  });
});

describe('createGitConfig', () => {
  let fsMock;

  beforeAll(() => {});

  beforeEach(() => {
    jest.resetModules();
    fsMock = {
      __esModule: true,
      appendFileSync: jest.fn()
    };
    jest.doMock('fs', () => fsMock);
  });

  it('should exist as a function', async () => {
    const { createGitConfig } = await import('../create-git-config');
    expect(typeof createGitConfig).toEqual('function');
  });

  it('should call fs.appendFileSync for every entry', async () => {
    const { createGitConfig } = await import('../create-git-config');
    const numTimes = Math.floor(Math.random() * 10);
    const input = times(numTimes, () => ({
      packageName: Math.floor(Math.random() * 100).toString(),
      owner: Math.floor(Math.random() * 100).toString()
    })) as any;

    createGitConfig(input);

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
    const { createGitConfig } = await import('../create-git-config');
    expect(createGitConfig([])).toEqual(
      path.join(process.env.HOME as string, '.gitconfig')
    );
  });
});
