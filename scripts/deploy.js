const hre = require("hardhat");

async function main() {
  
  const feePercent = 5;
  const uri = ""

  const EventsBazaar = await hre.ethers.getContractFactory("EventsBazaar");
  const eventsBazaar = await EventsBazaar.deploy(feePercent);
  await eventsBazaar.deployed();

  console.log(
    `EventBazaar deployed to ${eventsBazaar.address}`
  );

  const EventNFT = await hre.ethers.getContractFactory("EventNFT");
  const eventNFT = await EventNFT.deploy(uri);
  await eventNFT.deployed();

  console.log(
    `EventNFT deployed to ${eventNFT.address}`
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});