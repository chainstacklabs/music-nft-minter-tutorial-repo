require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-web3");
require("@nomicfoundation/hardhat-verify");

const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  solidity: "0.8.17",
  networks: {
    mainnet: {
      url: process.env.MAINNET,
      accounts: [PRIVATE_KEY]
    },
    goerli: {
      url: process.env.GOERLI,
      accounts: [PRIVATE_KEY]
    },
    sepolia: {
      url: process.env.SEPOLIA,
      accounts: [PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN,
  },
};