import { execFileSync, execSync } from 'child_process';

export function startSSHAgent() {
  const execOut = execSync('eval "$(ssh-agent -s)"');
  return execOut;
}
