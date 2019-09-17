import { execFileSync } from 'child_process';

export function startSSHAgent() {
  const execOut = execFileSync('ssh-agent', ['-s']);
  return execOut;
}
