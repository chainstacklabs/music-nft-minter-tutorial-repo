// Process dependencies
require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');

// Initialize your endpoint URL for Web3.js, wallet address, and private key
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT_URL);
const address = process.env.PUBLIC_KEY;
const privKey = process.env.PRIVATE_KEY;

// Initialize the contents of the locally compiled contract ABI and bytecode
var contractABI = JSON.parse(fs.readFileSync('./contract/MFMNFT_sol_MyFirstMusicNFT.abi', 'utf8'));
var contractBIN = fs.readFileSync('./contract/MFMNFT_sol_MyFirstMusicNFT.bin', 'utf8');

// Create asynchronous deploy function
const deploy = async () => {
  console.log('Attempting to deploy contract from: ', address);

  // Create new contract object
  const contractNFT = new web3.eth.Contract(contractABI, address);

  // Deploy contract object as a transaction
  const contractTX = contractNFT.deploy({

    // Set transaction data as the contract bytecode
    data: contractBIN,
  });

  // Sign the transaction
  const createTransaction = await web3.eth.accounts.signTransaction({

      // Define transaction parameters
      from: address,
      data: contractTX.encodeABI(),
      gas: 5000000,
    },
    privKey
  );

  // Return transaction receipt
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );

  // Log contract address from receipt
  console.log('\nContract successfully deployed at: ' + createReceipt.contractAddress + '.\n\nCopy the following and replace the "CONTRACT_KEY" line in your ".env" file:\n\n' + 'CONTRACT_KEY="' + createReceipt.contractAddress + '"');
};

// Don’t forget to run the function!
deploy();
