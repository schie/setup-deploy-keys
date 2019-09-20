'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const child_process_1 = require('child_process');
function startSSHAgent() {
  const execOut = child_process_1.execSync('eval "$(ssh-agent -s)"');
  return execOut;
}
exports.startSSHAgent = startSSHAgent;
