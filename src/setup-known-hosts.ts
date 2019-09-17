// RUN touch /root/.ssh/known_hosts
// RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

export function setupKnownHosts() {
  const sshPath = path.join(process.env.HOME as any, '.ssh');
  fs.mkdirSync(sshPath, { recursive: true });
  const knownHostsPath = path.join(sshPath, 'known_hosts');
  fs.closeSync(fs.openSync(knownHostsPath, 'w'));
  execSync(`ssh-keyscan github.com >> ${knownHostsPath}`);
  return knownHostsPath;
}
