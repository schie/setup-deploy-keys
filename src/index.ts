import * as core from '@actions/core';

import { addDeployKeys, DeployKeyData } from './add-deploy-keys';
import { createGitConfig } from './create-git-config';
import { createSSHConfig } from './create-ssh-config';
import { setupKnownHosts } from './setup-known-hosts';
import { startSSHAgent } from './start-ssh-agent';
import { getFileName } from './utils';

function doTheThing() {
  const deployKeyData = JSON.parse(
    core.getInput('deployKeyData')
  ) as DeployKeyData[];

  const sshConfigData = deployKeyData.map(({ ownerName, packageName }) => ({
    hostAlias: packageName,
    identityFileName: getFileName(ownerName, packageName)
  }));

  createSSHConfig(sshConfigData as any);
  createGitConfig(deployKeyData as any);
  startSSHAgent();
  addDeployKeys(deployKeyData);
  setupKnownHosts();
}

doTheThing();
