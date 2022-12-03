const hre = require("hardhat");

async function main() {
  
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