import { LodashFactory } from './factories';
const { snakeCase } = LodashFactory();
import { getFileName } from '../utils';

describe('getFIleName()', () => {
  let ownerName: string, packageName: string;
  beforeEach(() => {
    ownerName = Math.random().toString();
    packageName = Math.random().toString();

    jest.resetModules();
    snakeCase.mockClear();
  });

  it('should exist as a function', () => {
    expect(typeof getFileName).toEqual('function');
  });

  it('should use snakeCase', () => {
    getFileName(ownerName, packageName);
    expect(snakeCase).toHaveBeenCalledTimes(3);
    const strs = [ownerName, packageName, 'id_rsa'];
    strs.forEach((str, i) => {
      expect(snakeCase).toHaveBeenNthCalledWith(i + 1, str, i, strs);
    });
  });

  it('should join params with `id_rsa` with snake case', () => {
    expect(getFileName(ownerName, packageName)).toEqual(
      [ownerName, packageName, 'id_rsa'].map(snakeCase).join('__')
    );
  });
});
