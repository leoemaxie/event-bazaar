// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EventsBazaar is ReentrancyGuard, ERC1155Holder {
    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint256 public feePercent; // the fee percentage on ticket sales
    uint256 public eventCount;
    uint256 public relistedTicketCount;

    struct EventTicket {
        uint256 eventId;
        IERC1155 nft;
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

    event RegisterEvent(
        uint256 itemId,
        address indexed nft,
        uint256 price,
        address indexed seller
    );
    event PurchasedTicket(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        address indexed seller,
        address indexed buyer
    );
    event TicketRelisted(address from, uint256 indexed eventId);
    event PurchaseRelist(address to, uint256 indexed eventId);

    constructor() {
        feeAccount = payable(msg.sender);
    }

    function setFeePercent(uint _fee) public {
        require(msg.sender == feeAccount, "You're not the owner!");
        feePercent = _fee;
    }

    // Register event to offer on the marketplace
    function registerEvent(
        IERC1155 _nft,
        uint256 _price,
        uint256 _tokenId
    ) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        // increment eventCount
        eventCount++;

        IERC1155 nft = IERC1155(_nft);
        uint256 amount = nft.balanceOf(msg.sender, _tokenId);

        //transfer
        nft.safeTransferFrom(msg.sender, address(this), _tokenId, amount, "");

        // add new item to items mapping
        events[eventCount] = EventTicket(
            eventCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            amount,
            false
        );

        // emit RegisterEvent event
        emit RegisterEvent(eventCount, address(_nft), _price, msg.sender);
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

        IERC1155 nft = IERC1155(eventItem.nft);
        // transfer nft ticket to buyer
        nft.safeTransferFrom(
            address(this),
            msg.sender,
            eventItem.tokenId,
            1,
            ""
        );

        // emit PurchasedTicket event
        emit PurchasedTicket(
            _eventId,
            address(eventItem.nft),
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

        IERC1155 nft = IERC1155(events[_eventId].nft);
        // Tranfer from `sender` to markeplace
        nft.safeTransferFrom(
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

        IERC1155 nft = IERC1155(eventItem.nft);

        // transfer ticket nft to buyer
        nft.safeTransferFrom(
            address(this),
            msg.sender,
            eventItem.tokenId,
            1,
            ""
        );

        emit PurchaseRelist(msg.sender, relistedTicket.eventId);
    }

    function getBalanceOfAddress(address addr, uint256 _eventId)
        public
        view
        returns (uint256)
    {
        return events[_eventId].nft.balanceOf(addr, events[_eventId].tokenId);
    }

    event GiftTicket(address from, address to, uint eventId);

    function giftMyTicket(address _receiver, uint256 _eventId) external {
        uint256 balance = getBalanceOfAddress(
            msg.sender,
            events[_eventId].tokenId
        );
        require(balance > 0, "You have no ticket for this event");

        IERC1155 nft = IERC1155(events[_eventId].nft);

        nft.safeTransferFrom(
            msg.sender,
            _receiver,
            events[_eventId].tokenId,
            1,
            ""
        );

        emit GiftTicket(msg.sender, _receiver, _eventId);
    }
}
