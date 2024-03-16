import { ethers } from "hardhat";
async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  const LSP8Mock = await ethers.getContractFactory("LSP8Mock");
  const lSP8Mock = await LSP8Mock.deploy("TheSocietyNFT", "TSNFT", deployer);
  const lSP8MockDeployed = await lSP8Mock.waitForDeployment();

  const LSP8Address = await lSP8MockDeployed.getAddress();
  console.log(
    "✅ LSP8 Contract successfully deployed at address: ",
    LSP8Address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
