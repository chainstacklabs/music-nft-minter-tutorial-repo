# Music NFT minter tutorial repo

## Description
Repo containing all tutorial files from the "How to mint a music NFT: Dropping fire tunes with Chainstack IPFS" guide, originally published on the Chainstack blog. Contains scripts, contracts, ABI, BIN, and JSON files needed to create a new wallet, check its balance, compile an NFT contract, and mint music NFTs using pre-set metadata on the Ethereum network.

## Tutorial link
Find the full tutorial article available on the Chainstack blog:
https://chainstack.com/how-to-mint-music-nft/

## Usage
Clone or fork this repo to a preferred location. Install dependencies by running in CLI:

`npm install`

Generate a new wallet address and key pair by running in CLI:

`node keys.js`

Check wallet balance by running in CLI:

`node balance.js`

Deploy the NFT minter smart contract from the ABI & BIN files by running in CLI:

`node deploy.js`

Upload all media files and JSON metadata to Chainstack IPFS by running in CLI:

`node upload.js`

Mint an NFT with the metadata from the uploaded JSON file by running in CLI:

`node mint.js`

## File list
* keys.js - Script to generate a wallet address and key pair
* balance.js - Script to check the balance of a wallet address
* MFMNFT.sol - Smartcontract supporting functions to mint NFTs with custom tokenURI
* MFMNFT_sol_MyFirstMusicNFT.abi - ABI compiled from the NFT minter smart contract
* MFMNFT_sol_MyFirstMusicNFT.bin - BIN compiled from the NFT minter smart contract
* deploy.js - Script to deploy the NFT minter smart contract from the ABI & BIN files
* upload.js - Script to upload relevant media files and JSON metadata to Chainstack IPFS
* mint.js - Script to mint an NFT with the metadata from uploaded JSON metadata file
* .env - Dotenv file containing pre-formatted slots needed for key script variables
* /src/*.* - Sample media files and metadata JSON you can use to test minting

## Dependency list
* Node endpoint - Get one for free at: https://console.chainstack.com/user/account/create
* Web3.js - Collection of libraries for Web3 interaction: https://web3js.readthedocs.io/
* @openzeppelin/contracts - Smart contract library: https://github.com/OpenZeppelin/openzeppelin-contracts
* Solc.js - Solidity compiler library installed globally: https://github.com/ethereum/solc-js
* Dotenv - Environment file library to process key variables: https://github.com/motdotla/dotenv OR https://github.com/dotenv-org/dotenv-vault
* axios - HTTP request parser to handle IPFS upload: https://github.com/axios/axios
* form-data - Metadata generator library for file metadata uploaded to IPFS: https://github.com/form-data/form-data

## End result
* Contract: https://goerli.etherscan.io/address/0xBC23e35f9F9850883222eB2D2f2747fD49664f70
* Music NFT: https://goerli.etherscan.io/token/0xbc23e35f9f9850883222eb2d2f2747fd49664f70?a=0
* OpenSea: https://testnets.opensea.io/assets/goerli/0xbc23e35f9f9850883222eb2d2f2747fd49664f70/0/
