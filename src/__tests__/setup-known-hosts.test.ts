import { times } from 'lodash';

import { FsFactory, PathFactory } from './factories';
const { mkdirSync, appendFileSync } = FsFactory();
const { join } = PathFactory();

import { createEntry, setupKnownHosts } from '../setup-known-hosts';

describe('createEntry()', () => {
  it('should exist as a function', () => {
    expect(typeof createEntry).toEqual('function');
  });

  it('should join keys of param object', () => {
    const publicKey = Math.random().toString();
    const hostAlias = Math.random().toString();
    expect(createEntry({ publicKey, hostAlias })).toEqual(`${hostAlias} ${publicKey}\n`);
  });
});

describe('setupKnownHosts()', () => {
  let numTimes: number;
  let input: any[];
  const sshPath = jest.requireActual('path').join(process.env.HOME as any, '.ssh');
  const knownHostsPath = jest.requireActual('path').join(sshPath, 'known_hosts');

  beforeEach(() => {
    numTimes = Math.floor(Math.random() * 10);
    input = times(numTimes, () => ({
      publicKey: Math.random().toString(),
      hostAlias: Math.random().toString()
    }));
    jest.resetModules();
    [mkdirSync, appendFileSync, join].forEach(fn => {
      fn.mockClear();
    });
  });

  it('should exist as a function', () => {
    expect(typeof setupKnownHosts).toEqual('function');
  });

  it('should return known hosts path', () => {
    expect(setupKnownHosts(input)).toEqual(knownHostsPath);
  });

  it('should use path.join 2 times', () => {
    setupKnownHosts(input);
    expect(join).toHaveBeenCalledTimes(2);
    [[process.env.HOME, '.ssh'], [sshPath, 'known_hosts']].forEach((el, i) => {
      expect(join).toHaveBeenNthCalledWith(i + 1, ...el);
    });
  });

  it('should use fs.mkdirSync', () => {
    setupKnownHosts(input);
    expect(mkdirSync).toBeCalledWith(sshPath, { recursive: true });
  });

  it('should use fs.appendFileSync n times', () => {
    setupKnownHosts(input);
    expect(appendFileSync).toBeCalledTimes(numTimes);
    input.forEach((param, i) => {
      expect(appendFileSync).toHaveBeenNthCalledWith(i + 1, knownHostsPath, createEntry(param));
    });
  });
});
