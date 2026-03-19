// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title NotarialNFT
 * @dev NFT contract for tokenizing real estate properties in Argentina
 * Each NFT represents a property title with immutable metadata on IPFS
 */
contract NotarialNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Property metadata structure
    struct PropertyMetadata {
        string propertyAddress;
        string cadastralCode; // Nomenclatura catastral
        uint256 priceUSD;
        string sellerCUIT;
        string buyerCUIT;
        uint256 mintedAt;
        string ipfsHash; // Link to full documentation
    }

    // Mapping from token ID to property metadata
    mapping(uint256 => PropertyMetadata) public properties;

    // Mapping to track if a property address has been tokenized
    mapping(string => bool) public isPropertyTokenized;

    // Events
    event PropertyMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string propertyAddress,
        uint256 priceUSD
    );

    event PropertyTransferred(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to,
        uint256 priceUSD,
        uint256 timestamp
    );

    constructor() ERC721("Notarial Property", "NPROP") Ownable(msg.sender) {
        console.log("NotarialNFT deployed by:", msg.sender);
    }

    /**
     * @dev Mint a new property NFT
     * @param to Address of the property owner
     * @param propertyAddress Physical address of the property
     * @param cadastralCode Nomenclatura catastral
     * @param priceUSD Price in USD
     * @param sellerCUIT CUIT of the seller
     * @param buyerCUIT CUIT of the buyer
     * @param ipfsHash IPFS hash of property documents
     * @param tokenURI Metadata URI
     */
    function mintProperty(
        address to,
        string memory propertyAddress,
        string memory cadastralCode,
        uint256 priceUSD,
        string memory sellerCUIT,
        string memory buyerCUIT,
        string memory ipfsHash,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        require(!isPropertyTokenized[propertyAddress], "Property already tokenized");
        require(to != address(0), "Invalid recipient address");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        properties[tokenId] = PropertyMetadata({
            propertyAddress: propertyAddress,
            cadastralCode: cadastralCode,
            priceUSD: priceUSD,
            sellerCUIT: sellerCUIT,
            buyerCUIT: buyerCUIT,
            mintedAt: block.timestamp,
            ipfsHash: ipfsHash
        });

        isPropertyTokenized[propertyAddress] = true;

        emit PropertyMinted(tokenId, to, propertyAddress, priceUSD);

        console.log("Property minted - Token ID:", tokenId);
        console.log("Address:", propertyAddress);
        console.log("Price USD:", priceUSD);

        return tokenId;
    }

    /**
     * @dev Get property metadata
     */
    function getProperty(uint256 tokenId) public view returns (PropertyMetadata memory) {
        require(_ownerOf(tokenId) != address(0), "Property does not exist");
        return properties[tokenId];
    }

    /**
     * @dev Get total number of properties minted
     */
    function totalProperties() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
     * @dev Override required by Solidity
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Override required by Solidity
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Hook that is called after any token transfer
     */
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);
        
        if (from != address(0) && to != address(0)) {
            // This is a transfer (not mint or burn)
            PropertyMetadata memory prop = properties[tokenId];
            emit PropertyTransferred(tokenId, from, to, prop.priceUSD, block.timestamp);
            
            console.log("Property transferred - Token ID:", tokenId);
            console.log("From:", from);
            console.log("To:", to);
        }

        return super._update(to, tokenId, auth);
    }
}
