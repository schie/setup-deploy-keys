"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const add_deploy_keys_1 = require("./add-deploy-keys");
const create_ssh_config_1 = require("./create-ssh-config");
const setup_known_hosts_1 = require("./setup-known-hosts");
const utils_1 = require("./utils");
function doTheThing() {
    const inputData = JSON.parse(core.getInput('deployKeyData'));
    const sshConfigData = [];
    const knownHostData = [];
    const deployKeyData = [];
    inputData.forEach(({ ownerName, packageName, privateKey, publicKey, hostAlias }) => {
        const identityFileName = utils_1.getFileName(ownerName, packageName);
        sshConfigData.push({
            identityFileName,
            hostAlias
        });
        knownHostData.push({
            publicKey,
            hostAlias
        });
        deployKeyData.push({
            identityFileName,
            privateKey
        });
    });
    create_ssh_config_1.createSSHConfig(sshConfigData);
    add_deploy_keys_1.addDeployKeys(deployKeyData);
    setup_known_hosts_1.setupKnownHosts(knownHostData);
}
doTheThing();
