const hre = require("hardhat");

async function main() {
  
  const EventsBazaar = await hre.ethers.getContractFactory("EventsBazaar");
  const eventsBazaar = await EventsBazaar.deploy();
  await eventsBazaar.deployed();

  console.log(
    `EventBazaar deployed to ${eventsBazaar.address}`
  );

  const EventNFT = await hre.ethers.getContractFactory("EventNFT");
  const eventNFT = await EventNFT.deploy();
  await eventNFT.deployed();

  console.log(
    `EventNFT deployed to ${eventNFT.address}`
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});