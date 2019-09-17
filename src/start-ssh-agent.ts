import { execSync } from 'child_process';
import cuid from 'cuid';

export function startSSHAgent(socketName?: string) {
  const sockitName = socketName || cuid();
  execSync(`ssh-agent -s -a ${sockitName}`);
  return sockitName;
}
