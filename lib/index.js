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
const create_git_config_1 = require("./create-git-config");
const create_ssh_config_1 = require("./create-ssh-config");
const setup_known_hosts_1 = require("./setup-known-hosts");
const start_ssh_agent_1 = require("./start-ssh-agent");
const utils_1 = require("./utils");
function doTheThing() {
    const deployKeyData = JSON.parse(core.getInput("deployKeyData"));
    const sshConfigData = deployKeyData.map(({ ownerName, packageName }) => ({
        hostAlias: packageName,
        identityFileName: utils_1.getFileName(ownerName, packageName)
    }));
    create_ssh_config_1.createSSHConfig(sshConfigData);
    create_git_config_1.createGitConfig(deployKeyData);
    start_ssh_agent_1.startSSHAgent();
    add_deploy_keys_1.addDeployKeys(deployKeyData);
    setup_known_hosts_1.setupKnownHosts();
}
doTheThing();
