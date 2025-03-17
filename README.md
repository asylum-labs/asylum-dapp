# Asylum Labs dApp

![Asylum Labs](/public/asylum-meta-image.png)

![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/asylum-labs/asylum-dapp) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/asylum-labs/asylum-dapp) ![GitHub contributors](https://img.shields.io/github/contributors/asylum-labs/asylum-dapp)

<!-- [![asylum labs token](https://img.shields.io/badge/$ALT-0x0000...0000-8429c6.svg?logo=ethereum)](#) -->

This repository contains the frontend for Asylum Labs, an ecosystem of DeFi tools designed to manage risk, unlock liquidity, and secure assets on any blockchain. For the core smart contracts, see the [v1-core](https://github.com/asylum-labs/v1-core) repository.

[![warpcast](https://img.shields.io/badge/Follow_@asylum--labs-FFFFFF.svg?logo=farcaster)](https://warpcast.com/asylum-labs) ![twitter follow](https://img.shields.io/twitter/follow/asylum-labs)

## Prerequisites

[![git](https://img.shields.io/badge/git-any-darkgreen)](https://git-scm.com/downloads) [![node](https://img.shields.io/badge/node.js->_14.2.4-darkgreen)](https://nodejs.org/en/download/) [![npm](https://img.shields.io/badge/npm->=_6-darkgreen)](https://npmjs.com/) [![docker](https://img.shields.io/badge/docker-optional-blue)](https://www.docker.com/)

## Directory Structure

- `abi` - Contains ABI `json` files and global references to onchain deployments used in the app.
- `src` - Source code for the Next.js application
- Ensure sensitive data is stored in `.env.local`

## Set Up

Clone the repository:

```sh
git clone https://github.com/asylum-labs/asylum-dapp.git
```

If already cloned locally, ensure you have the latest changes locally:

```sh
git pull origin main
```

Install all dependencies:

```sh
npm install
```

Then, start the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-darkgreen.svg)](CONTRIBUTING.md)

If you are a developer looking to contribute, please take a look at the guidelines in [CONTRIBUTING](CONTRIBUTING.md) first, then feel free to look at [open issues](https://github.com/asylum-labs/asylum-dapp/issues/) or open a [new one](https://github.com/asylum-labs/asylum-dapp/issues/new/choose).

If you are an Solidity developer and are interested in auditing our contracts, you can submit an audit by using the form [here](https://github.com/asylum-labs/v1-core/issues/new?assignees=heyJonBray&labels=type%3A+audit%2C+status%3A+discussing&projects=&template=04-audit-submission.md&title=asylum-v1-core+audit+%5BMM-DD-YYYY%5D-%5ByourName%5D).

## Security

For any security-related concerns, please refer to the [SECURITY](SECURITY.md) policy. This repository is subject to a bug bounty program per the terms outlined in the aforementioned policy.

For vulnerability hunters, please see our [Bug Bounty Program](bug-bounty.md).

## License

The Asylum Labs frontend is licensed under [GNU General Public License](LICENSE.md), while the core protocol smart contracts is under the Business Source License 1.1 (BUSL-1.1), see [`LICENSE.md`](asylum-labs/v1-core/LICENSE.md).
