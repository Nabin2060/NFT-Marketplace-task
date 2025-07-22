// === ERC-721 Smart Contract (Solidity) ===
// File: contracts/KuverseNFT.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KuverseNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    struct Metadata {
        string name;
        string description;
        string rarity;
    }

    mapping(uint256 => Metadata) private tokenMetadata;

    constructor() ERC721("KuverseNFT", "KNFT") {
        tokenCounter = 0;
    }

    function mintNFT(string memory _name, string memory _description, string memory _rarity, string memory tokenURI) public {
        uint256 tokenId = tokenCounter;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        tokenMetadata[tokenId] = Metadata(_name, _description, _rarity);
        tokenCounter++;
    }

    function getMetadata(uint256 tokenId) public view returns (string memory, string memory, string memory) {
        require(_exists(tokenId), "Token does not exist");
        Metadata memory data = tokenMetadata[tokenId];
        return (data.name, data.description, data.rarity);
    }

    function getOwnedTokens(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory result = new uint256[](balance);
        uint256 index = 0;
        for (uint256 i = 0; i < tokenCounter; i++) {
            if (_exists(i) && ownerOf(i) == owner) {
                result[index] = i;
                index++;
            }
        }
        return result;
    }
}
