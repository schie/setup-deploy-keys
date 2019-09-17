"use strict";
// RUN touch /root/.ssh/known_hosts
// RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
function setupKnownHosts() {
    const sshPath = path.join(process.env.HOME, ".ssh");
    fs.mkdirSync(sshPath, { recursive: true });
    const knownHostsPath = path.join(sshPath, "known_hosts");
    fs.closeSync(fs.openSync(knownHostsPath, "w"));
    child_process_1.execFileSync(`ssh-keyscan github.com >> ${knownHostsPath}`);
    return knownHostsPath;
}
exports.setupKnownHosts = setupKnownHosts;
