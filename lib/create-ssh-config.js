"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function createEntry({ hostAlias, identityFileName }) {
    return `Host ${hostAlias}
    User git
    Hostname github.com
    IdentitiesOnly yes
    IdentityFile ${path.join(process.env.HOME, '.ssh', identityFileName)}\n`;
}
exports.createEntry = createEntry;
function createSSHConfig(params) {
    const homeSSH = path.join(process.env.HOME, '.ssh');
    const sshConfigPath = path.join(homeSSH, 'config');
    fs.mkdirSync(homeSSH, { recursive: true });
    params.forEach(params => {
        const entry = createEntry(params);
        fs.appendFileSync(sshConfigPath, entry);
    });
    return sshConfigPath;
}
exports.createSSHConfig = createSSHConfig;
