// Process dependencies
require('dotenv').config();
const Web3 = require('web3');

// Initialize your endpoint URL for web3.js and wallet address
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT_URL);
const address = process.env.PUBLIC_KEY;

// Define your get balance function
const getbal = async (address) => {

  // Call the web3.js getBalance method
  const balance = await web3.eth.getBalance(address);

  // Return your wallet balance in Wei and ETH
  console.log('\nChecking balance for address: ' + address + '...\n\nYour balance is: ' + balance + 'Wei\nThis amounts to: ' + web3.utils.fromWei(balance) + 'ETH');
};

// Don't forget to run your function!
getbal(address);
