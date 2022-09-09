import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });

const GOERLI_API_KEY_URL = process.env.GOERLI_API_KEY_URL;
const MUMBAI_API_KEY_URL = process.env.MUMBAI_API_KEY_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

module.exports = {
  solidity: "0.8.15",
  networks: {
    goerli: {
      url: GOERLI_API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
    mumbai: {
      url: MUMBAI_API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_KEY || "",
    },
    customChains: [
      {
        network: "goerli",
        chainId: 5,
        urls: {
          apiURL: "https://api-goerli.etherscan.io/api",
          browserURL: "https://goerli.etherscan.io",
        },
      },
    ],
  },
  // etherscan: {
  //   apiKey: {
  //     polygonMumbai: process.env.POLYGONSCAN_KEY || "",
  //   }
  // }
};
