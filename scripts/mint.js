// Process dependencies
require('dotenv').config();
require("@nomiclabs/hardhat-web3");
const fs = require('fs');
const path = require('path');

// Initialize your wallet address and private key
const address = process.env.PUBLIC_KEY;
const privKey = process.env.PRIVATE_KEY;

// Initialize your deployed smart contract address for the selected network
let contractAdrs;
if (network.name == 'sepolia') {
  const contractENV = process.env.SEPOLIA_CONTRACT
  contractAdrs = contractENV;
} else if (network.name == 'goerli') {
  const contractENV = process.env.GOERLI_CONTRACT;
  contractAdrs = contractENV;
} else {
  const contractENV = process.env.MAINNET_CONTRACT;
  contractAdrs = contractENV;
}

// Replace 'MyFirstMusicNFT' with your contract's name.
const contractName = 'MyFirstMusicNFT';

// Find the compiled smart contract to get the ABI
const artifactPath = path.resolve(__dirname, `../artifacts/contracts/${contractName}.sol/${contractName}.json`);
const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, 'utf-8'));
const contractABI = contractArtifact.abi;

// Initialize the JSON metadata URL
const metadata = "https://ipfsgw.com/ipfs/QmX5mrBWukdWVByxnoUS4GJTysVBFjjoVg1fgSjExNV7Dd"

// Create a new contract object and set interactions origin to the owner address
const contractObj = new web3.eth.Contract(contractABI, contractAdrs, {
  from: address,
});

// Define a minting function
const startMint = async () => {
  console.log(`\nAttempting to mint on ${network.name} to: ${address}...\n`);

  // Estimate the gas costs needed to process the transaction
  const gasCost = await contractObj.methods.safeMint(address, metadata).estimateGas((err, gas) => {
    if (!err) console.log(`Estimated gas: ${gas}...\n`);
    else console.error(`Error estimating gas: ${err}...\n`);
  });

  // Define the transaction details and sign it
  const mintTX = await web3.eth.accounts.signTransaction(
    {
      from: address,
      to: contractAdrs,
      data: contractObj.methods.safeMint(address, metadata).encodeABI(),
      gas: gasCost,
    },
    privKey,
  );

  // Get transaction receipt
  const createReceipt = await web3.eth.sendSignedTransaction(mintTX.rawTransaction);

  // Provide appropriate network for Etherscan link
  if (network.name !== 'mainnet'){
  console.log(`NFT successfully minted on ${network.name} with hash: ${createReceipt.transactionHash}\n\nView the transaction on Etherscan: https://${network.name}.etherscan.io/tx/${createReceipt.transactionHash}\n`);
  } else {
    console.log(`NFT successfully minted on ${network.name} with hash: ${createReceipt.transactionHash}\n\nView the transaction on Etherscan: https://etherscan.io/tx/${createReceipt.transactionHash}\n`);
  }
};

// Don't forget to run the main function!
startMint();
