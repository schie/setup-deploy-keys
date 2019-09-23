import * as fs from 'fs';
import * as path from 'path';
import { DeployKeyData } from './utils';

export function addDeployKeys(deployKeyData: DeployKeyData[]) {
  const sshPath = path.join(process.env.HOME as string, '.ssh');
  // make directory
  fs.mkdirSync(sshPath, { recursive: true });

  // write private key to ssh dir
  return deployKeyData.map(({ privateKey, identityFileName }) => {
    const filePath = path.join(sshPath, identityFileName);
    // write file
    fs.writeFileSync(filePath, privateKey);
    return filePath;
  });
}
