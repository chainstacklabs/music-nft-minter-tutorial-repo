// Process dependencies
require('dotenv').config();
require("@nomiclabs/hardhat-web3");

// Initialize your wallet address
const address = process.env.WALLET;

// Define your get balance function
const getbal = async (address) => {

  // Call the web3.js getBalance method
  const balance = await web3.eth.getBalance(address);

  // Return your wallet balance in Wei and ETH on the selected network
  console.log(`\nChecking ${network.name} balance for address: ${address}...\n\nYour balance is: ${balance}Wei\nThis amounts to: ${web3.utils.fromWei(balance)}ETH\n`);
};

// Don't forget to run your get balance function!
getbal(address);
