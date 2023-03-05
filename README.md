# 🅱️itkit

A frontend for an EVM rollup on Bitcoin built with Rollkit.

## The stack

Bitkit is built with [Bitcoin](https://bitcoin.org/), [Rollkit](https://rollkit.dev/), & [Ethermint](https://github.com/celestiaorg/ethermint).

Bitkit is a smart contract demo on a [sovereign rollup](https://celestia.org/glossary/sovereign-rollup) built on Bitcoin to provide [data availability](https://celestia.org/glossary/data-availability) & [consensus](https://ethereum.org/en/developers/docs/consensus-mechanisms), leveraging Ethermint with Rollkit as the [execution environment](https://celestia.org/glossary/execution-environment).

This allows users to securely create and share messages on the sovereign rollup secured by Bitcoin without the need for a centralized server or authority.

This application is deployed on IPFS and can be accessed through ENS (buildmarket.eth) or [DNS](https://bitkit.dev/). Read more [here 🛸](https://mirror.xyz/joshcstein.eth/UbInedh4ToAAfsDklzSPb3R1_hVSHIdE97hvxIWYlOo)

## Developing this site yourself

```sh
# clone the repository
git clone https://github.com/rollkit/bitkit.git

# CD into directory, and frontend
cd bitkit/frontend

# Install dependencies
yarn

# Develop site locally
yarn dev
```
