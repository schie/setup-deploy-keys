import { snakeCase } from 'lodash';

export function getFileName(ownerName: string, packageName: string) {
  return [ownerName, packageName, 'id_rsa'].map(snakeCase).join('__');
}
