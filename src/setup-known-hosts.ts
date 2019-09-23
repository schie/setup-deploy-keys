import * as fs from 'fs';
import * as path from 'path';
import { EntryData } from './utils';

function createEntry({ publicKey, hostAlias }: EntryData) {
  return `${hostAlias} ${publicKey}\n`;
}

export function setupKnownHosts(params: EntryData[]) {
  const sshPath = path.join(process.env.HOME as any, '.ssh');
  fs.mkdirSync(sshPath, { recursive: true });
  const knownHostsPath = path.join(sshPath, 'known_hosts');
  params.forEach(param => {
    const entry = createEntry(param);
    fs.appendFileSync(knownHostsPath, entry);
  });
  return knownHostsPath;
}
