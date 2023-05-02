// Process dependencies
require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');

// Initialize your endpoint URL for Web3.js, wallet address, private key, deployed smart contract ABI, and JSON metadata URL
const address = process.env.PUBLIC_KEY;
const privKey = process.env.PRIVATE_KEY;
const contractAdrs = process.env.CONTRACT_KEY;
const contractNFT = JSON.parse(fs.readFileSync('./contract/MFMNFT_sol_MyFirstMusicNFT.abi', 'utf8'));
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT_URL);
const metadata = 'https://ipfsgw.com/ipfs/QmX5mrBWukdWVByxnoUS4GJTysVBFjjoVg1fgSjExNV7Dd';

// Create a new contract object and set interactions origin to the owner address
const contractObj = new web3.eth.Contract(contractNFT, contractAdrs, {
  from: address,
});

// Define a gas estimation function
const gasEstimate = async () => {
  return await contractObj.methods.safeMint(address, metadata).estimateGas();
};

// Define a minting function
const startMint = async () => {
  console.log('Attempting to mint to:', address);
  const estimate = await gasEstimate();
  console.log('Estimated gas needed:', estimate);

  // Define the transaction details and sign it
  const mintTX = await web3.eth.accounts.signTransaction(
    {
      from: address,
      to: contractAdrs,
      data: contractObj.methods.safeMint(address, metadata).encodeABI(),
      gas: estimate,
    },
    privKey,
  );

  // Get transaction receipt
  const createReceipt = await web3.eth.sendSignedTransaction(mintTX.rawTransaction);
  console.log('NFT successfully minted with hash:', createReceipt);
};

// Don't forget to call the minting function!
startMint();
