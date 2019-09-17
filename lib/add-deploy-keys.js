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
const child_process_1 = require("child_process");
const utils_1 = require("./utils");
function addDeployKeys(deployKeyData) {
    const sshPath = path.join(process.env.HOME, '.ssh');
    // make directory
    fs.mkdirSync(sshPath, { recursive: true });
    // write private key to ssh dir
    return deployKeyData.map(({ privateKey, packageName, ownerName }) => {
        // make file name: schie__some_package__id_rsa
        const fileName = utils_1.getFileName(ownerName, packageName);
        const filePath = path.join(sshPath, fileName);
        // write file
        fs.writeFileSync(filePath, privateKey);
        // ssh add
        child_process_1.execFileSync(`ssh-add ${filePath}`);
        return filePath;
    });
}
exports.addDeployKeys = addDeployKeys;
