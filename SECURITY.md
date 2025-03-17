# Security Policy &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-darkgreen.svg)](https://github.com/asylum-labs/.github/blob/main/CONTRIBUTING.md)

## Reporting a Vulnerability

If you discover a security vulnerability in Asylum Labs smart contracts or app, we encourage you to report it to us as soon as possible. We will handle your report with the highest priority and confidentiality.

We encourage responsible disclosure, please do not open an issue for sensitive vulnerabilities. Instead, email your findings to [asylum.defi@pm.me](mailto:asylum.defi@pm.me) or send a DM on [Warpcast](https://warpcast.com/jonbray.eth).
Include as much detail as possible in your report to help us understand and reproduce the issue.
If applicable, include a link/hash to any relevant onchain transactions and a minimal repo including tests that showcase the behavior in question.

## Response Expectations

- **Acknowledgement**: We will acknowledge receipt of your report within 48 hours.
- **Initial Triage**: We will complete an initial assessment of your report within 5 business days.
- **Resolution**: We will work to resolve the issue as quickly as possible, keeping you informed of our progress.
- **Reward**: If the findings are eligible for a reward, we will reach out for a receiving address and process payment within 5 business days after resolution.

## Bug Bounties

[![asylum labs token](https://img.shields.io/badge/$ALT-0x000000000000000000000000000000000000null-8429c6.svg?logo=ethereum)](https://app.uniswap.org/explore/tokens/ethereum/0x000000000000000000000000000000000000null?chain=base)

Bug bounties that meet certain criteria are eligible for $ALT token rewards, that are paid upon completion.

| Vulnerability                                                   | Max Reward                                                   | Description                                                                    |
| --------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| ![severe](https://img.shields.io/badge/level-severe-red.svg)    | ![500k](https://img.shields.io/badge/ALT-500,000-000000.svg) | Bug that would definitely result in the direct loss of user funds if not fixed |
| ![high](https://img.shields.io/badge/level-high-darkorange.svg) | ![100k](https://img.shields.io/badge/ALT-200,000-000000.svg) | Bug that may result in the direct loss or user or protocol funds if not fixed  |
| ![medium](https://img.shields.io/badge/level-medium-yellow.svg) | ![10k](https://img.shields.io/badge/ALT-25,000-000000.svg)   | Bug that prevents core logic from behaving as required; No loss of funds       |

Although general enhancements such as gas efficiency improvements and refactoring are appreciated, they are not subject to payouts for bug bounties.
We do however recognize regular contributors who commit to our repositories with rewards on a case-by-case basis.

## [Bug Bounty Program](https://github.com/asylum-labs/.github/blob/main/bug-bounty.md) &middot; ![eligible](https://img.shields.io/badge/v1--core-eligible-darkgreen.svg) ![not eligible](https://img.shields.io/badge/asylum--dapp-not_eligible-red.svg)

The following deployments are subject to bounty rewards up to and including the vulnerability levels listed below:

| Codebase                                                        | Bounty                                                          |
| --------------------------------------------------------------- | --------------------------------------------------------------- |
| [asylum-dapp](https://github.com/asylum-labs/asylum-dapp)       | ![medium](https://img.shields.io/badge/level-medium-yellow.svg) |
| [v1-core](https://github.com/asylum-labs/v1-core)               | ![severe](https://img.shields.io/badge/level-severe-red.svg)    |
| [asylum-testnet](https://github.com/asylum-labs/asylum-testnet) | ![low](https://img.shields.io/badge/level-low-pink.svg)         |

Completed bug bounties are claimable per-codebase, not per-network deployment of that codebase.

Portions of our codebase are subject to the Asylum Labs Bug Bounty (the "Program") to incentivize responsible disclosure of vulnerabilities. We are offering ALT token rewards for submissions that meet eligibility criteria.

### Community Audit Program

In order to maximize the security of our `v1-core` contracts, we will be opening them for community audit prior to their release on mainnet. If you are a Solidity developer with auditing experience, and would like to earn ALT token rewards in exchange for providing a detailed contract audit, please contact us on [Warpcast](https://warpcast.com/jonbray.eth), or by [email](mailto:asylum.defi@pm.me) for an invite to an audit discussion in Slack.

## Security Updates

To stay informed about security updates, follow us on [Warpcast](https://warpcast.com/asylum-labs) and [X](https://x.com/asylum-defi) for the latest updates. Additionally, we publish regular articles on our [Paragraph Newsletter](https://paragraph.xyz/@asylum-labs).

## Security Practices

We are committed to ensuring the security of our platform and follow best practices, including:

- Regular penetration testing
- Open-Sourcing public contracts
- Continuous dependency management
- Proactive vulnerability scanning

Thank you for helping us keep Asylum Labs secure.
