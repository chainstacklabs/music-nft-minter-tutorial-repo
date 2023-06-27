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
  <a target="_blank" href="https://api.chainstack.com/reference/">Blockchain API reference</a> •
  <a target="_blank" href="https://console.chainstack.com/user/account/create">Start for free</a> •
</p>

# Music NFT minter tutorial [![using with dotenv-vault](https://badge.dotenv.org/using.svg?r=1)](https://www.dotenv.org/r/github.com/motdotla/dotenv?r=1)
This project contains all tutorial files from the [How to mint a music NFT: Dropping fire tunes with Chainstack IPFS](https://chainstack.com/how-to-mint-music-nft/) tutorial, originally published on the [Chainstack blog](https://chainstack.com/blog/).

## Project details
This repository contains scripts and contracts needed to create a new wallet, check its balance, compile an NFT contract, and mint music NFTs using pre-set metadata on the Ethereum network with [Chainstack IPFS](https://chainstack.com/ipfs-storage/), Hardhat and Web3js.

## Outcomes
* [Contract: Goerli](https://goerli.etherscan.io/address/0x7d8c7C54d98D533Af176DE1a0e280898E55537eb)
* [Contract: Sepolia](https://sepolia.etherscan.io/address/0x268ac7297bca4fbc05783927fabaa8eb73927f87)
* [Music NFT: Goerli](https://goerli.etherscan.io/token/0x7d8c7C54d98D533Af176DE1a0e280898E55537eb)
* [Music NFT: Sepolia](https://sepolia.etherscan.io/token/0x268ac7297bca4fbc05783927fabaa8eb73927f87)
* [OpenSea](https://testnets.opensea.io/assets/goerli/0x7d8c7c54d98d533af176de1a0e280898e55537eb/0)  

## Dependencies
* [Chainstack endpoint](https://console.chainstack.com/user/account/create)  
* [Dotenv](https://github.com/motdotla/dotenv)  
* [Hardhat with Web3js](https://github.com/NomicFoundation/hardhat/tree/main/packages/hardhat-web3)  
* [OpenZeppelin contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)  
* [Axios](https://github.com/axios/axios)  
* [Form data](https://github.com/form-data/form-data)  

## Usage
1. Clone or fork this repo to a preferred location by running in CLI:  

```
git clone https://github.com/petarsrepo/music-nft-minter-tutorial-repo.git  
```

2. Install dependencies by running in CLI:  

```sh
npm ci  
```

3. Rename `.env.sample` to `.env` and fill in your endpoint URLs for each network, then your Chainstack and Etherscan API keys:  

```env
GOERLI="https://your-goerli-endpoint-here"
SEPOLIA="https://your-sepolia-endpoint-here"
MAINNET="https://your-mainnet-endpoint-here"
CHAINSTACK="Bearer y0urChainstackAPIkeyHer3"
ETHERSCAN="Y0URETHERSCANAPIKEYHER3"
```

4. Generate a new wallet address key pair and fund it from the Chainstack $NETWORK faucet by running in CLI:  

```sh
npx hardhat run scripts/wallet.js --network $NETWORK  
```

5. Check wallet balance by running in CLI:  

```sh
npx hardhat run scripts/balance.js --network $NETWORK  
```

6. Deploy the NFT minter smart contract from the ABI & BIN files by running in CLI:  

```sh
npx hardhat run scripts/deploy.js --network $NETWORK  
```

7. Upload all media files and JSON metadata to Chainstack IPFS by running in CLI:  

```sh
npx hardhat run scripts/upload.js  
```

8. Mint an NFT with the metadata from the uploaded JSON file by running in CLI:  

```sh
npx hardhat run scripts/mint.js --network $NETWORK  
```

## Files
* .env.sample - Sample Dotenv file containing pre-formatted slots needed for key script variables
* contracts/MyFirstMusicNFT.sol - Smart contract supporting functions to mint NFTs with custom tokenURI
* src/ - Sample media files and metadata JSON you can use to test minting
* scripts/wallet.js - Script to generate a wallet address and key pair
* scripts/balance.js - Script to check the balance of a wallet address
* scripts/deploy.js - Script to deploy the NFT minter smart contract from the ABI & BIN files
* scripts/upload.js - Script to upload relevant media files and JSON metadata to Chainstack IPFS
* scripts/mint.js - Script to mint an NFT with the metadata from uploaded JSON metadata file
