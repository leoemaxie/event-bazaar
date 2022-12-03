// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract EventNFT is ERC1155 {
   uint256 public TICKET;
    address public owner;
    string public baseUri;

    constructor() ERC1155("https://events-bazaar.infura-ipfs.io/ipfs/{id}") {
        owner = msg.sender;
    }

    mapping(uint => string) public ticketUri;

    event MintTickets(address sender, uint ticketId, uint _volume);

    function mintTickets(uint _volume, string memory cid) external {
        TICKET++;
        _mint(msg.sender, TICKET, _volume, "");

        ticketUri[TICKET] = cid;

        emit MintTickets(msg.sender, TICKET, _volume);
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_tokenId > 0 && _tokenId <= TICKET, "Token ID does not exist");
        string memory url = ticketUri[_tokenId];
        return
            string(
                abi.encodePacked(baseUri, url)
            );
    }

    function setURI(string memory newuri) public {
        require(msg.sender == owner, "You're not the owner");
        baseUri = newuri;
        _setURI(newuri);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not token owner or approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
    }
}
