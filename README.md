# setup-deploy-keys

🚧 This project is still a work in progress 🚧

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=schie/setup-deploy-keys)](https://dependabot.com)

This action sets up SSH configuration for using [GitHub deploy keys](https://github.blog/2015-06-16-read-only-deploy-keys/) in a [GitHub Action](https://github.com/features/actions)

- creating / appending to ~/.ssh/config file
- creating / appending to ~/.ssh/known_hosts file
- inserting private keys with provided data

More information about deploy keys can be found [here](https://developer.github.com/v3/guides/managing-deploy-keys/)

## Getting Started

_TODO: write more documentation_

```yaml
# github workflow yml file
steps:
  - name: setting up deploy keys
    uses: schie/setup-deploy-keys@master
    with:
      deployKeyData: ${{secrets.DEPLOY_KEYS}}
  - installation step
```

This project expects a project secret called `DEPLOY_KEYS` that contains JSON in the
following format

```JSON
[
  {
    "privateKey": "-----BEGIN OPENSSH PRIVATE KEY-----\n {SOME PRIVATE KEY JANK} \n-----END OPENSSH PRIVATE KEY-----\n",
    "publicKey": "ssh-rsa {SOME GOBBLY GOOK} {some_user}@{some_host}",
    "packageName": "my-package-name",
    "ownerName": "my-user-or-org",
    "hostAlias": "{my-package-name}.github.com"
  },
   //...
]
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

# Contributions

Contributions are welcome!
