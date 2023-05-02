<img width="1200" alt="Labs" src="https://user-images.githubusercontent.com/99700157/213291931-5a822628-5b8a-4768-980d-65f324985d32.png">

<p>
 <h3 align="center">Chainstack is the leading suite of services connecting developers with Web3 infrastructure</h3>
</p>

<p align="center">
  <a target="_blank" href="https://chainstack.com/build-better-with-ethereum/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Ethereum.svg" /></a>&nbsp;  
  <a target="_blank" href="https://chainstack.com/build-better-with-bnb-smart-chain/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/BNB.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-polygon/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Polygon.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-avalanche/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Avalanche.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-fantom/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Fantom.svg" /></a>&nbsp;
</p>

<p align="center">
  • <a target="_blank" href="https://chainstack.com/">Homepage</a> •
  <a target="_blank" href="https://chainstack.com/protocols/">Supported protocols</a> •
  <a target="_blank" href="https://chainstack.com/blog/">Chainstack blog</a> •
  <a target="_blank" href="https://docs.chainstack.com/quickstart/">Chainstack docs</a> •
  <a target="_blank" href="https://docs.chainstack.com/quickstart/">Blockchain API reference</a> •
  <a target="_blank" href="https://console.chainstack.com/user/account/create">Start for free</a> •
</p>

# Music NFT minter tutorial
This project contains all tutorial files from the "How to mint a music NFT: Dropping fire tunes with Chainstack IPFS" guide, originally published on the Chainstack blog.

Find the full tutorial article available on the Chainstack blog:
* [Music NFT minter tutorial](https://chainstack.com/how-to-mint-music-nft/)

## Project details
This repository contains scripts and contracts needed to create a new wallet, check its balance, compile an NFT contract, and mint music NFTs using pre-set metadata on the Ethereum network.

## Outcomes
* Contract: https://goerli.etherscan.io/address/0xBC23e35f9F9850883222eB2D2f2747fD49664f70
* Music NFT: https://goerli.etherscan.io/token/0xbc23e35f9f9850883222eb2d2f2747fd49664f70?a=0
* OpenSea: https://testnets.opensea.io/assets/goerli/0xbc23e35f9f9850883222eb2d2f2747fd49664f70/0/

## Dependencies
* Node endpoint - Get one for free at: https://console.chainstack.com/user/account/create
* Web3.js - Collection of libraries for Web3 interaction: https://web3js.readthedocs.io/
* @openzeppelin/contracts - Smart contract library: https://github.com/OpenZeppelin/openzeppelin-contracts
* Solc.js - Solidity compiler library installed globally: https://github.com/ethereum/solc-js
* Dotenv - Environment file library to process key variables: https://github.com/motdotla/dotenv OR https://github.com/dotenv-org/dotenv-vault
* axios - HTTP request parser to handle IPFS upload: https://github.com/axios/axios
* form-data - Metadata generator library for file metadata uploaded to IPFS: https://github.com/form-data/form-data

## Usage
Clone or fork this repo to a preferred location. Install dependencies by running in CLI:

`npm ci`

Generate a new wallet address and key pair by running in CLI:

`node scripts/keys.js`

Check wallet balance by running in CLI:

`node scripts/balance.js`

Deploy the NFT minter smart contract from the ABI & BIN files by running in CLI:

`node scripts/deploy.js`

Upload all media files and JSON metadata to Chainstack IPFS by running in CLI:

`node scripts/upload.js`

Mint an NFT with the metadata from the uploaded JSON file by running in CLI:

`node scripts/mint.js`

## Files
* scripts/keys.js - Script to generate a wallet address and key pair
* scripts/balance.js - Script to check the balance of a wallet address
* contract/MFMNFT.sol - Smart contract supporting functions to mint NFTs with custom tokenURI
* contract/MFMNFT_sol_MyFirstMusicNFT.abi - ABI compiled from the NFT minter smart contract
* contract/MFMNFT_sol_MyFirstMusicNFT.bin - BIN compiled from the NFT minter smart contract
* scripts/deploy.js - Script to deploy the NFT minter smart contract from the ABI & BIN files
* scripts/upload.js - Script to upload relevant media files and JSON metadata to Chainstack IPFS
* scripts/mint.js - Script to mint an NFT with the metadata from uploaded JSON metadata file
* .env.sample - Sample Dotenv file containing pre-formatted slots needed for key script variables
* src/ - Sample media files and metadata JSON you can use to test minting
