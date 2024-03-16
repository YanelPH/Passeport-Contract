import { HardhatUserConfig } from "hardhat/config";
import { config as LoadEnv } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

LoadEnv();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19", // Utilisez la version de Solidity que vous compilez
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Ajustez ce nombre selon vos besoins
      },
    },
  },
  networks: {
    luksoTestnet: {
      url: "https://rpc.testnet.lukso.network",
      chainId: 4201,
      accounts: [
        process.env.PRIVATE_KEY as string,
        process.env.PRIVATE_KEY2 as string,
      ],
    },
  },
};

export default config;
