// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract EventsBazaar is ReentrancyGuard, ERC1155, ERC1155Holder {
    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint256 public immutable feePercent; // the fee percentage on ticket sales
    uint256 public eventCount;
    uint256 public relistedTicketCount;
    uint256 public TICKET;
    string public baseUri;

    struct EventTicket {
        uint256 eventId;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        uint256 volume;
        bool soldOut;
    }

    struct RelistedTicket {
        uint256 listId;
        uint256 eventId;
        uint256 tokenId;
        address payable seller;
        bool sold;
    }

    // eventId -> Ticket
    mapping(uint256 => EventTicket) public events;

    //listId -> Ticket
    mapping(uint256 => RelistedTicket) public relistedTickets;
    mapping(uint256 => string) public ticketUri;

    event MintTickets(address sender, uint256 ticketId, uint256 _volume);

    event RegisterEvent(uint256 itemId, uint256 price, address indexed seller);
    event PurchasedTicket(
        uint256 itemId,
        uint256 tokenId,
        uint256 price,
        address indexed seller,
        address indexed buyer
    );
    event TicketRelisted(address from, uint256 indexed eventId);
    event PurchaseRelist(address to, uint256 indexed eventId);

    // https://events-bazaar.infura-ipfs.io/ipfs/{id}
    constructor(uint256 _feePercent, string memory _baseUrl) ERC1155(_baseUrl) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
        baseUri = _baseUrl;
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_tokenId > 0 && _tokenId <= TICKET, "Token ID does not exist");
        string memory url = ticketUri[_tokenId];
        return string(abi.encodePacked(baseUri, url));
    }

    // Register event to offer on the marketplace
    function registerEvent(
        uint256 _price,
        string memory cid,
        uint256 _volume
    ) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        // increment eventCount
        eventCount++;
        TICKET++;
        _mint(msg.sender, TICKET, _volume, "");

        ticketUri[TICKET] = cid;

        //transfer
        safeTransferFrom(msg.sender, address(this), TICKET, _volume, "");

        // add new item to items mapping
        events[eventCount] = EventTicket(
            eventCount,
            TICKET,
            _price,
            payable(msg.sender),
            _volume,
            false
        );

        // emit RegisterEvent event
        emit RegisterEvent(eventCount, _price, msg.sender);
    }

    function purchaseTicket(uint256 _eventId) external payable nonReentrant {
        uint256 _totalPrice = getTotalPrice(_eventId);
        EventTicket storage eventItem = events[_eventId];

        require(
            _eventId > 0 && _eventId <= eventCount,
            "Event Id doesn't exist"
        );
        require(!eventItem.soldOut, "Tickets already sold out!");
        require(eventItem.volume > 0, "Tickets sold out!");
        require(
            msg.value >= _totalPrice,
            "Not enough matic to cover Ticket price and market fee"
        );

        // pay seller and feeAccount
        eventItem.seller.transfer(eventItem.price);
        feeAccount.transfer(_totalPrice - eventItem.price);

        //update `volume` when ticket is sold
        eventItem.volume -= 1;

        // update tickets `soldOut` when it's value is `zero`
        if (eventItem.volume == 0) {
            eventItem.soldOut = true;
        }

        // transfer nft ticket to buyer
        _safeTransferFrom(address(this), msg.sender, eventItem.tokenId, 1, "");

        // emit PurchasedTicket event
        emit PurchasedTicket(
            _eventId,
            eventItem.tokenId,
            eventItem.price,
            eventItem.seller,
            msg.sender
        );
    }

    function getTotalPrice(uint256 _eventId) public view returns (uint256) {
        return ((events[_eventId].price * (100 + feePercent)) / 100);
    }

    function getBalanceOfTickets(uint256 _eventId)
        external
        view
        returns (uint256)
    {
        return events[_eventId].volume;
    }

    function listMyPurchasedTicket(uint256 _eventId) external {
        EventTicket storage eventItem = events[_eventId];
        uint256 balance = getBalanceOfAddress(msg.sender, eventItem.tokenId);

        require(balance > 0, "You have no ticket for this event");

        relistedTicketCount++;

        // Tranfer from `sender` to markeplace
        safeTransferFrom(
            msg.sender,
            address(this),
            events[_eventId].tokenId,
            1,
            ""
        );

        relistedTickets[relistedTicketCount] = RelistedTicket(
            relistedTicketCount,
            _eventId,
            events[_eventId].tokenId,
            payable(msg.sender),
            false
        );

        emit TicketRelisted(msg.sender, _eventId);
    }

    function purchaseRelistedTicket(uint256 _relistedTicketId)
        external
        payable
    {
        RelistedTicket storage relistedTicket = relistedTickets[
            _relistedTicketId
        ];
        uint256 _totalPrice = getTotalPrice(relistedTicket.eventId);
        EventTicket storage eventItem = events[relistedTicket.eventId];

        // pay seller and feeAccount
        eventItem.seller.transfer(eventItem.price);
        feeAccount.transfer(_totalPrice - eventItem.price);

        relistedTicket.sold = true;

        // transfer ticket nft to buyer
        _safeTransferFrom(address(this), msg.sender, eventItem.tokenId, 1, "");

        emit PurchaseRelist(msg.sender, relistedTicket.eventId);
    }

    function getBalanceOfAddress(address addr, uint256 _eventId)
        public
        view
        returns (uint256)
    {
        return balanceOf(addr, events[_eventId].tokenId);
    }

    event GiftTicket(address from, address to, uint256 eventId);

    function giftMyTicket(address _receiver, uint256 _eventId) external {
        uint256 balance = getBalanceOfAddress(
            msg.sender,
            events[_eventId].tokenId
        );
        require(balance > 0, "You have no ticket for this event");

        _safeTransferFrom(
            msg.sender,
            _receiver,
            events[_eventId].tokenId,
            1,
            ""
        );

        emit GiftTicket(msg.sender, _receiver, _eventId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
