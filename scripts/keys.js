// Process dependencies
const Web3 = require('web3');
require('dotenv').config();

// Initialize your endpoint URL for Web3.js
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT_URL);

// Create a new wallet address
const keys = web3.eth.accounts.create();

// Return your wallet access details
console.log('\nYour new address is: ' + keys.address + "\nYour new address' private key is: " + keys.privateKey + '\n\nCopy the following and replace the "PUBLIC_KEY" and "PRIVATE_KEY" lines in your ".env" file:\n\n' + 'PUBLIC_KEY="' + keys.address + '"\nPRIVATE_KEY="' + keys.privateKey + '"');
