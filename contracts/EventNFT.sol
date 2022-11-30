// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract EventNFT is ERC1155 {
   uint256 public TICKET;
    address public owner;
    string public baseUri;

    constructor() ERC1155("") {
        owner = msg.sender;
    }

    event MintTickets(address sender, uint ticketId, uint _volume);

    function mintTickets(uint _volume) external {
        TICKET++;
        _mint(msg.sender, TICKET, _volume, "");

        emit MintTickets(msg.sender, TICKET, _volume);
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_tokenId > 0 && _tokenId <= TICKET, "Token ID does not exist");
        return
            string(
                abi.encodePacked(baseUri, Strings.toString(_tokenId), ".json")
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
