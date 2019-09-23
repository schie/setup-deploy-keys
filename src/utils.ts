import { snakeCase } from 'lodash';

export function getFileName(ownerName: string, packageName: string) {
  return [ownerName, packageName, 'id_rsa'].map(snakeCase).join('__');
}

export interface InputData {
  privateKey: string;
  publicKey: string;
  packageName: string;
  ownerName: string;
  hostAlias: string;
}
export interface DeployKeyData {
  identityFileName: string;
  privateKey: string;
}

export interface CreateSessionConfigParams {
  hostAlias: string;
  identityFileName: string;
}

export interface EntryData {
  publicKey: string;
  hostAlias: string;
}
