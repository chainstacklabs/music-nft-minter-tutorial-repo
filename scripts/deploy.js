// Process dependencies
require('dotenv').config();
require("@nomiclabs/hardhat-web3");
require("@nomicfoundation/hardhat-verify");
const fs = require('fs');
const path = require('path');
const address = process.env.WALLET;
const privKey = process.env.PRIVATE_KEY;

// Replace 'MyFirstMusicNFT' with your contract's name.
const contractName = 'MyFirstMusicNFT';

// Find the compiled smart contract to get the ABI and bytecode
const artifactPath = path.resolve(__dirname, `../artifacts/contracts/${contractName}.sol/${contractName}.json`);
const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, 'utf-8'));
const contractABI = contractArtifact.abi;
const contractBIN = contractArtifact.bytecode;

// Create asynchronous main function to deploy your contract
async function main() {
  console.log(`\nAttempting to deploy the ${contractName} contract on ${network.name} from: ${address}\n`);
  // Create new contract object
  const contractNFT = new web3.eth.Contract(contractABI, address);

  // Deploy contract object as a transaction
  const contractTX = await contractNFT.deploy({

    // Set transaction data as the contract bytecode
    data: contractBIN,
  });

  // Estimate the gas costs needed to process the transaction
  const gasCost = await contractTX.estimateGas((err, gas) => {
    if (!err) console.log(`Estimated gas: ${gas}...`);
    else console.error(`Error estimating gas: ${err}...`);
  });

  // Sign the transaction
  const createTransaction = await web3.eth.accounts.signTransaction({

    // Define transaction parameters
    from: address,
    data: contractTX.encodeABI(),
    gas: gasCost,
  },
    privKey
  );

  // Return transaction receipt
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );

  // Log contract address from receipt
  console.log(`\nContract successfully deployed on ${network.name} at: ${createReceipt.contractAddress} \n\nCopy the following line to your ".env" file:\n\n${network.name.toUpperCase()}_CONTRACT="${createReceipt.contractAddress}"\n`);

  // Verify the contract
  async function verifyContract() {
    console.log("Verifying contract in 5 blocks...\n");

    // Wait for 5 blocks before running verification
    await waitForBlocks(5);
    await run("verify:verify", {
      address: createReceipt.contractAddress,
      constructorArguments: [],
    });
    console.log("\nContract deployed and verified!\n");
  }
  verifyContract();
}

// Wait for `n` blocks function
async function waitForBlocks(n) {

  // Get the latest block number
  let latestBlockNumber = await web3.eth.getBlockNumber();
  console.log(`Current block number: ${latestBlockNumber}...`);

  // Calculate the block number to wait for
  let targetBlockNumber = latestBlockNumber + n;
  console.log(`Waiting until block number: ${targetBlockNumber}...`);

  // Check for the right block at a given interval
  return new Promise((resolve) => {
    let interval = setInterval(async () => {
      latestBlockNumber = await web3.eth.getBlockNumber();
      console.log(`Checked latest block number: ${latestBlockNumber}...`);

      // Check if the current block number matches the one to wait for
      if (latestBlockNumber >= targetBlockNumber) {
        clearInterval(interval);
        console.log(`Target block reached: ${latestBlockNumber}...\n`);
        resolve();
      }
    }, 5000);  // Set polling interval as per your need.
  });
}

// Don't forget to run your main function! Add error handling too
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});