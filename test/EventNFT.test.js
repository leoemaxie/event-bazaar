const { expect } = require("chai");
const hre = require("hardhat");

describe("Event NFT", () => {

    const volume = 5;
    const baseUri = "afdgdhdhgdtehnd";
    let ticket, deployer, addr1, addr2, addr3, otherAddrs;

    before(async function () {
        [deployer, addr1, addr2, addr3, ...otherAddrs] = await hre.ethers.getSigners();
        const Ticket = await hre.ethers.getContractFactory("EventNFT");
        ticket = await Ticket.deploy();
        await ticket.deployed();
    });

    it("Mints all the tokens to the msg.sender", async () => {
        
        await ticket.connect(deployer).mintTickets(volume, baseUri);
        const tokenId = await ticket.TICKET();

        const balanceOfOwner = await ticket.balanceOf(deployer.getAddress(), tokenId);

        expect(hre.ethers.utils.formatUnits(balanceOfOwner, 'wei')).to.equal(volume.toString());
    })

    it("Returns the set `uri`", async () => {
        const tokenId = await ticket.TICKET();
        const tokenUri = await ticket.uri(tokenId);

        expect(tokenUri).to.equal(`${baseUri}`);
    })
})