const hre = require("hardhat");

async function main() {

  const EventsBazaar = await hre.ethers.getContractFactory("EventsBazaar");
  const eventsBazaar = await EventsBazaar.deploy(5, 'https://events-bazaar.infura-ipfs.io/ipfs/');
  await eventsBazaar.deployed();

  console.log(
    `EventBazaar deployed to ${eventsBazaar.address}`
  );
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
