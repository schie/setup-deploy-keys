import * as path from 'path';
import * as fs from 'fs';

// [url "git@yd-krypto.github.com:yellowdogsoftware/yd-krypto"]
//   insteadOf = https://github.com/yellowdogsoftware/yd-krypto
// [url "git@graphql-type-guid.github.com:yellowdogsoftware/graphql-type-guid"]
//   insteadOf = https://github.com/yellowdogsoftware/graphql-type-guid

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
