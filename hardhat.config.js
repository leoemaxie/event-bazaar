require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { POLYGON_MUMBAI_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  },
  networks: {
    mumbai: {
      url: POLYGON_MUMBAI_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "frontend/artifacts"
  },
};
