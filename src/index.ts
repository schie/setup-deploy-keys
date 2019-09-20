import * as core from '@actions/core';

import { addDeployKeys, DeployKeyData } from './add-deploy-keys';
import { createSSHConfig } from './create-ssh-config';
import { getFileName } from './utils';

function doTheThing() {
  const deployKeyData = JSON.parse(core.getInput('deployKeyData')) as DeployKeyData[];
  const sshConfigData = deployKeyData.map(({ ownerName, packageName }) => ({
    hostAlias: packageName,
    identityFileName: getFileName(ownerName, packageName)
  }));

  createSSHConfig(sshConfigData as any);
  addDeployKeys(deployKeyData);
}

doTheThing();
