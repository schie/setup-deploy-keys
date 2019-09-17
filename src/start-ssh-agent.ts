import { execFileSync } from 'child_process';
import cuid from 'cuid';

export function startSSHAgent(socketName?: string) {
  const sockitName = socketName || cuid();
  execFileSync(`ssh-agent -s`);
  return sockitName;
}
