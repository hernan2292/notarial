// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

/**
 * @title PropertyEscrow
 * @dev Atomic escrow for property transfers
 * Holds NFT from seller and USDC from buyer, then executes atomic swap
 */
contract PropertyEscrow is ReentrancyGuard, Ownable {
    IERC721 public propertyNFT;
    IERC20 public usdc;

    struct Transfer {
        uint256 tokenId;
        address seller;
        address buyer;
        uint256 priceUSD;
        bool sellerApproved;
        bool buyerApproved;
        bool completed;
        uint256 createdAt;
    }

    // Mapping from transfer ID to Transfer
    mapping(uint256 => Transfer) public transfers;
    uint256 public transferCounter;

    // Events
    event TransferCreated(
        uint256 indexed transferId,
        uint256 indexed tokenId,
        address indexed seller,
        address buyer,
        uint256 priceUSD
    );

    event SellerApproved(uint256 indexed transferId);
    event BuyerApproved(uint256 indexed transferId);

    event TransferCompleted(
        uint256 indexed transferId,
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 priceUSD
    );

    event TransferCancelled(uint256 indexed transferId);

    constructor(address _propertyNFT, address _usdc) Ownable(msg.sender) {
        propertyNFT = IERC721(_propertyNFT);
        usdc = IERC20(_usdc);
        
        console.log("PropertyEscrow deployed");
        console.log("NFT Contract:", _propertyNFT);
        console.log("USDC Contract:", _usdc);
    }

    /**
     * @dev Create a new property transfer
     * @param tokenId ID of the property NFT
     * @param buyer Address of the buyer
     * @param priceUSD Price in USDC (6 decimals)
     */
    function createTransfer(
        uint256 tokenId,
        address buyer,
        uint256 priceUSD
    ) external returns (uint256) {
        require(buyer != address(0), "Invalid buyer address");
        require(buyer != msg.sender, "Buyer cannot be seller");
        require(propertyNFT.ownerOf(tokenId) == msg.sender, "Not the property owner");
        require(priceUSD > 0, "Price must be greater than 0");

        uint256 transferId = transferCounter++;

        transfers[transferId] = Transfer({
            tokenId: tokenId,
            seller: msg.sender,
            buyer: buyer,
            priceUSD: priceUSD,
            sellerApproved: false,
            buyerApproved: false,
            completed: false,
            createdAt: block.timestamp
        });

        emit TransferCreated(transferId, tokenId, msg.sender, buyer, priceUSD);

        console.log("Transfer created - ID:", transferId);
        console.log("Token ID:", tokenId);
        console.log("Seller:", msg.sender);
        console.log("Buyer:", buyer);
        console.log("Price:", priceUSD);

        return transferId;
    }

    /**
     * @dev Seller approves the transfer by depositing NFT
     */
    function sellerApprove(uint256 transferId) external nonReentrant {
        Transfer storage transfer = transfers[transferId];
        
        require(msg.sender == transfer.seller, "Not the seller");
        require(!transfer.completed, "Transfer already completed");
        require(!transfer.sellerApproved, "Already approved");

        // Transfer NFT to escrow
        propertyNFT.transferFrom(msg.sender, address(this), transfer.tokenId);
        
        transfer.sellerApproved = true;
        emit SellerApproved(transferId);

        console.log("Seller approved transfer:", transferId);

        // If buyer also approved, complete the transfer
        if (transfer.buyerApproved) {
            _completeTransfer(transferId);
        }
    }

    /**
     * @dev Buyer approves the transfer by depositing USDC
     */
    function buyerApprove(uint256 transferId) external nonReentrant {
        Transfer storage transfer = transfers[transferId];
        
        require(msg.sender == transfer.buyer, "Not the buyer");
        require(!transfer.completed, "Transfer already completed");
        require(!transfer.buyerApproved, "Already approved");

        // Transfer USDC to escrow
        require(
            usdc.transferFrom(msg.sender, address(this), transfer.priceUSD),
            "USDC transfer failed"
        );
        
        transfer.buyerApproved = true;
        emit BuyerApproved(transferId);

        console.log("Buyer approved transfer:", transferId);

        // If seller also approved, complete the transfer
        if (transfer.sellerApproved) {
            _completeTransfer(transferId);
        }
    }

    /**
     * @dev Internal function to complete the atomic swap
     */
    function _completeTransfer(uint256 transferId) internal {
        Transfer storage transfer = transfers[transferId];
        
        require(transfer.sellerApproved, "Seller not approved");
        require(transfer.buyerApproved, "Buyer not approved");
        require(!transfer.completed, "Already completed");

        transfer.completed = true;

        // Atomic swap: NFT to buyer, USDC to seller
        propertyNFT.transferFrom(address(this), transfer.buyer, transfer.tokenId);
        require(usdc.transfer(transfer.seller, transfer.priceUSD), "USDC transfer failed");

        emit TransferCompleted(
            transferId,
            transfer.tokenId,
            transfer.seller,
            transfer.buyer,
            transfer.priceUSD
        );

        console.log("Transfer completed:", transferId);
        console.log("NFT transferred to:", transfer.buyer);
        console.log("USDC transferred to:", transfer.seller);
    }

    /**
     * @dev Cancel a transfer (only if not completed)
     * Returns NFT to seller and USDC to buyer if they were deposited
     */
    function cancelTransfer(uint256 transferId) external nonReentrant {
        Transfer storage transfer = transfers[transferId];
        
        require(
            msg.sender == transfer.seller || msg.sender == transfer.buyer,
            "Not authorized"
        );
        require(!transfer.completed, "Transfer already completed");

        // Return NFT if seller approved
        if (transfer.sellerApproved) {
            propertyNFT.transferFrom(address(this), transfer.seller, transfer.tokenId);
        }

        // Return USDC if buyer approved
        if (transfer.buyerApproved) {
            require(usdc.transfer(transfer.buyer, transfer.priceUSD), "USDC refund failed");
        }

        transfer.completed = true; // Mark as completed to prevent re-entry

        emit TransferCancelled(transferId);

        console.log("Transfer cancelled:", transferId);
    }

    /**
     * @dev Get transfer details
     */
    function getTransfer(uint256 transferId) external view returns (Transfer memory) {
        return transfers[transferId];
    }

    /**
     * @dev Emergency function to recover stuck tokens (only owner)
     */
    function emergencyWithdraw(
        address token,
        address to,
        uint256 amount
    ) external onlyOwner {
        IERC20(token).transfer(to, amount);
    }
}
