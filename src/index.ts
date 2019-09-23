import * as core from '@actions/core';

import { addDeployKeys } from './add-deploy-keys';
import { createSSHConfig } from './create-ssh-config';
import { setupKnownHosts } from './setup-known-hosts';
import {
  getFileName,
  DeployKeyData,
  CreateSessionConfigParams,
  EntryData,
  InputData
} from './utils';

function doTheThing() {
  const inputData = JSON.parse(core.getInput('deployKeyData')) as InputData[];
  const sshConfigData: CreateSessionConfigParams[] = [];
  const knownHostData: EntryData[] = [];
  const deployKeyData: DeployKeyData[] = [];

  inputData.forEach(({ ownerName, packageName, privateKey, publicKey, hostAlias }) => {
    const identityFileName = getFileName(ownerName, packageName);
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

  createSSHConfig(sshConfigData);
  addDeployKeys(deployKeyData);
  setupKnownHosts(knownHostData);
}

doTheThing();
