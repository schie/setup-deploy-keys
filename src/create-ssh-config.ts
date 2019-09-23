import * as path from 'path';
import * as fs from 'fs';
import { CreateSessionConfigParams } from './utils';

export function createEntry({ hostAlias, identityFileName }: CreateSessionConfigParams) {
  return `Host ${hostAlias}
    User git
    Hostname github.com
    IdentitiesOnly yes
    IdentityFile ${path.join(process.env.HOME as string, '.ssh', identityFileName)}\n`;
}

export function createSSHConfig(params: CreateSessionConfigParams[]) {
  const homeSSH = path.join(process.env.HOME as string, '.ssh');
  const sshConfigPath = path.join(homeSSH, 'config');
  fs.mkdirSync(homeSSH, { recursive: true });
  params.forEach(params => {
    const entry = createEntry(params);
    fs.appendFileSync(sshConfigPath, entry);
  });

  return sshConfigPath;
}
