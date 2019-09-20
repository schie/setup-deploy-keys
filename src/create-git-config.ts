import * as path from 'path';
import * as fs from 'fs';

interface CreateGitConfigParams {
  packageName: string;
  ownerName: string;
}

export function createEntry({ packageName, ownerName }: CreateGitConfigParams) {
  return `[url "git@${packageName}.github.com:${ownerName}/${packageName}"]
    insteadOf = https://github.com/${ownerName}/${packageName}\n`;
}

export function createGitConfig(params: CreateGitConfigParams[]) {
  const gitconfigPath = path.join(process.env.HOME as string, '.gitconfig');

  params.forEach(params => {
    const entry = createEntry(params);
    fs.appendFileSync(gitconfigPath, entry);
  });

  return gitconfigPath;
}
