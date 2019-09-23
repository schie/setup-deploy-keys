"use strict";
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
function createEntry({ publicKey, hostAlias }) {
    return `${hostAlias} ${publicKey}\n`;
}
function setupKnownHosts(params) {
    const sshPath = path.join(process.env.HOME, '.ssh');
    fs.mkdirSync(sshPath, { recursive: true });
    const knownHostsPath = path.join(sshPath, 'known_hosts');
    params.forEach(param => {
        const entry = createEntry(param);
        fs.appendFileSync(knownHostsPath, entry);
    });
    return knownHostsPath;
}
exports.setupKnownHosts = setupKnownHosts;
