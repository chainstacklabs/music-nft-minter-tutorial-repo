// Process dependencies
require('dotenv').config()
require("@nomiclabs/hardhat-web3");
const axios = require('axios');

// Create a new wallet then return the address and private key
const createWallet = async () => {
    const wallet = web3.eth.accounts.create();
    return [wallet.address, wallet.privateKey];
}

// Fund the wallet using the Chainstack faucet
const fundWallet = async (address, apiKey) => {
    const apiUrl = `https://api.chainstack.com/v1/faucet/${network.name}`;

    try {
        const response = await axios.post(apiUrl, { address }, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Main function to generate a new wallet and fund it using the Chainstack faucet
const main = async () => {
    try {

        // Config for the Faucet API call
        const apiKey = process.env.CHAINSTACK;

        console.log('\nAttempting to generate new wallet...\n')
        const [address, privateKey] = await createWallet();

        console.log(`Created new wallet with address: ${address}\n`);
        console.log(`New private key: ${privateKey} === KEEP IT SAFE ===\n`);
        console.log(`Copy the following and replace the "WALLET" and "PRIVATE_KEY" lines in your ".env" file:\n\nWALLET="${address}" \nPRIVATE_KEY="${privateKey}"\n`);
        console.log(`Sending ${network.name} faucet request for address ${address}...\n`);
        const fundResponse = await fundWallet(address, apiKey);
        console.log(`Successfully funded ${address} on ${network.name} for ${fundResponse.amountSent}ETH.\n\nView transaction on Etherscan: ${fundResponse.transaction}\n`);
    } catch (error) {
        console.error('An error occurred:', error.response.data);
    }
}

// Don't forget to run the main function!
main();