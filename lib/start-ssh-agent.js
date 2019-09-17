"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function startSSHAgent() {
    // const execOut = execFileSync('ssh-agent', ['-s']);
    // const execOut = execFileSync('eval "$(ssh-agent -s)"', ['']);
    const execOut = child_process_1.execSync('eval "$(ssh-agent -s)"');
    return execOut;
}
exports.startSSHAgent = startSSHAgent;
