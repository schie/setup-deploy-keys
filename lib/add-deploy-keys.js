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
function addDeployKeys(deployKeyData) {
    const sshPath = path.join(process.env.HOME, '.ssh');
    // make directory
    fs.mkdirSync(sshPath, { recursive: true });
    // write private key to ssh dir
    return deployKeyData.map(({ privateKey, identityFileName }) => {
        const filePath = path.join(sshPath, identityFileName);
        // write file
        fs.writeFileSync(filePath, privateKey);
        return filePath;
    });
}
exports.addDeployKeys = addDeployKeys;
