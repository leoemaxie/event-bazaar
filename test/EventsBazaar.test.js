const { expect } = require("chai");
const hre = require("hardhat");

describe("Events Bazaar", () => {
    let ticket, marketPlace, deployer, addr1, addr2, addr3, otherAddrs, volume, contractAddress;
    let baseUri = "sgsgshshsomeuri";

    beforeEach(async () => {
        [deployer, addr1, addr2, addr3, ...otherAddrs] = await hre.ethers.getSigners();
        const Ticket = await hre.ethers.getContractFactory("EventNFT");
        ticket = await Ticket.deploy();
        await ticket.deployed();
        await ticket.connect(deployer).mintTickets(7, baseUri);
        contractAddress = ticket.address;

        const MarketPlace = await hre.ethers.getContractFactory("EventsBazaar");
        marketPlace = await MarketPlace.deploy(5);
        await marketPlace.deployed();

    })

    it("Registers a new event to the marketplace and emits `RegisterEvent`", async () => {
        await ticket.connect(deployer).setApprovalForAll(marketPlace.address, true);
        const receipt = await marketPlace.connect(deployer).registerEvent(ticket.address, 2, ticket.TICKET());

        expect(receipt).to.emit(marketPlace, "RegisterEvent");
    })

    it("User is able to purchase a ticket for an event", async () => {
        await ticket.connect(deployer).setApprovalForAll(marketPlace.address, true);
        const tx = await marketPlace.connect(deployer).registerEvent(ticket.address, 2, ticket.TICKET());
        //await tx.wait()
        const eventId = await marketPlace.eventCount();
        const price = await marketPlace.getTotalPrice(eventId);
        const receipt = await marketPlace.connect(addr1).purchaseTicket(eventId, { value: price });

        expect(receipt).to.emit(marketPlace, "PurchasedTicket");
    })

    it("User is able to list his purchased ticket for sale", async () => {
        await ticket.connect(deployer).setApprovalForAll(marketPlace.address, true);
        const tx = await marketPlace.connect(deployer).registerEvent(ticket.address, 2, ticket.TICKET());

        const eventId = await marketPlace.eventCount();
        const price = await marketPlace.getTotalPrice(eventId);
        const receipt = await marketPlace.connect(addr1).purchaseTicket(eventId, { value: price });
        expect(receipt).to.emit(marketPlace, "PurchasedTicket");

        const bal1 = await marketPlace.getBalanceOfAddress(addr1.getAddress(), eventId);
        expect(bal1).to.equal(1);
        await ticket.connect(addr1).setApprovalForAll(marketPlace.address, true);
        const tx1 = await marketPlace.connect(addr1).listMyPurchasedTicket(eventId);
        expect(tx1).to.emit(marketPlace, "TicketRelisted");

        const bal2 = await marketPlace.getBalanceOfAddress(addr1.getAddress(), eventId);
        expect(bal2).to.equal(0);
    })

    it("Purchase relisted ticket and update variables", async () => {
        await ticket.connect(deployer).setApprovalForAll(marketPlace.address, true);
        await marketPlace.connect(deployer).registerEvent(ticket.address, 2, ticket.TICKET());

        const eventId = await marketPlace.eventCount();
        const price = await marketPlace.getTotalPrice(eventId);
        const receipt = await marketPlace.connect(addr1).purchaseTicket(eventId, { value: price });
        expect(receipt).to.emit(marketPlace, "PurchasedTicket");

        await ticket.connect(addr1).setApprovalForAll(marketPlace.address, true);
        const tx1 = await marketPlace.connect(addr1).listMyPurchasedTicket(eventId);
        expect(tx1).to.emit(marketPlace, "TicketRelisted");

        const relistedId = await marketPlace.relistedTicketCount();
        let getTicket;
        getTicket = await marketPlace.relistedTickets(relistedId);
        expect(getTicket.sold).to.be.false;
    
        const tx2 = await marketPlace.connect(addr2).purchaseRelistedTicket(relistedId, { value: price });
        expect(tx2).to.emit(marketPlace, "PurchaseRelist");
        expect(await marketPlace.getBalanceOfAddress(addr2.getAddress(), eventId)).to.equal(1);
        expect(await marketPlace.getBalanceOfAddress(addr1.getAddress(), eventId)).to.equal(0);
        getTicket = await marketPlace.relistedTickets(relistedId);
        expect(getTicket.sold).to.be.true;
    })

    it("Gift ticket to another user", async () => {
        await ticket.connect(deployer).setApprovalForAll(marketPlace.address, true);
        const tx = await marketPlace.connect(deployer).registerEvent(ticket.address, 2, ticket.TICKET());
        //await tx.wait()
        const eventId = await marketPlace.eventCount();
        const price = await marketPlace.getTotalPrice(eventId);
        const receipt = await marketPlace.connect(addr1).purchaseTicket(eventId, { value: price });

        expect(receipt).to.emit(marketPlace, "PurchasedTicket");

        await ticket.connect(addr1).setApprovalForAll(marketPlace.address, true);
        const tx1 = await marketPlace.connect(addr1).giftMyTicket(addr2.getAddress(), eventId);
        expect(tx1).to.emit(marketPlace, "GiftTicket");
    })
})
