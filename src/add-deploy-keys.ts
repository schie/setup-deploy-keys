import * as fs from 'fs';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { getFileName } from './utils';

export interface DeployKeyData {
  privateKey: string;
  packageName: string;
  ownerName: string;
}

export function addDeployKeys(deployKeyData: DeployKeyData[]) {
  const sshPath = path.join(process.env.HOME as string, '.ssh');
  // make directory
  fs.mkdirSync(sshPath, { recursive: true });

  // write private key to ssh dir
  return deployKeyData.map(({ privateKey, packageName, ownerName }) => {
    // make file name: schie__some_package__id_rsa
    const fileName = getFileName(ownerName, packageName);

    const filePath = path.join(sshPath, fileName);
    // write file
    fs.writeFileSync(filePath, privateKey);
    console.log(fs.readdirSync(sshPath));
    // ssh add
    execFileSync('ssh-add', [filePath]);
    return filePath;
  });
}
