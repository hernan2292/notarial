const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Notarial Contracts", function () {
  let notarialNFT;
  let propertyEscrow;
  let usdc;
  let owner;
  let seller;
  let buyer;

  const PROPERTY_ADDRESS = "Av. Libertador 5432, CABA";
  const CADASTRAL_CODE = "14-28-001-0045-0000-3";
  const PRICE_USD = ethers.parseUnits("250000", 6); // USDC has 6 decimals
  const SELLER_CUIT = "20-12345678-9";
  const BUYER_CUIT = "27-98765432-1";
  const IPFS_HASH = "QmTestPropertyDocuments";
  const TOKEN_URI = `ipfs://${IPFS_HASH}/metadata.json`;

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();

    // Deploy NotarialNFT
    const NotarialNFT = await ethers.getContractFactory("NotarialNFT");
    notarialNFT = await NotarialNFT.deploy();
    await notarialNFT.waitForDeployment();

    // Deploy mock USDC (for testing)
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    usdc = await MockERC20.deploy("USD Coin", "USDC", 6);
    await usdc.waitForDeployment();

    // Deploy PropertyEscrow
    const PropertyEscrow = await ethers.getContractFactory("PropertyEscrow");
    propertyEscrow = await PropertyEscrow.deploy(
      await notarialNFT.getAddress(),
      await usdc.getAddress()
    );
    await propertyEscrow.waitForDeployment();

    // Mint USDC to buyer for testing
    await usdc.mint(buyer.address, PRICE_USD * 10n);
  });

  describe("NotarialNFT", function () {
    it("Should mint a property NFT", async function () {
      const tx = await notarialNFT.mintProperty(
        seller.address,
        PROPERTY_ADDRESS,
        CADASTRAL_CODE,
        PRICE_USD,
        SELLER_CUIT,
        BUYER_CUIT,
        IPFS_HASH,
        TOKEN_URI
      );

      await tx.wait();

      const totalProperties = await notarialNFT.totalProperties();
      expect(totalProperties).to.equal(1);

      const owner = await notarialNFT.ownerOf(0);
      expect(owner).to.equal(seller.address);

      const property = await notarialNFT.getProperty(0);
      expect(property.propertyAddress).to.equal(PROPERTY_ADDRESS);
      expect(property.priceUSD).to.equal(PRICE_USD);
    });

    it("Should prevent duplicate property tokenization", async function () {
      await notarialNFT.mintProperty(
        seller.address,
        PROPERTY_ADDRESS,
        CADASTRAL_CODE,
        PRICE_USD,
        SELLER_CUIT,
        BUYER_CUIT,
        IPFS_HASH,
        TOKEN_URI
      );

      await expect(
        notarialNFT.mintProperty(
          seller.address,
          PROPERTY_ADDRESS,
          CADASTRAL_CODE,
          PRICE_USD,
          SELLER_CUIT,
          BUYER_CUIT,
          IPFS_HASH,
          TOKEN_URI
        )
      ).to.be.revertedWith("Property already tokenized");
    });

    it("Should emit PropertyMinted event", async function () {
      await expect(
        notarialNFT.mintProperty(
          seller.address,
          PROPERTY_ADDRESS,
          CADASTRAL_CODE,
          PRICE_USD,
          SELLER_CUIT,
          BUYER_CUIT,
          IPFS_HASH,
          TOKEN_URI
        )
      )
        .to.emit(notarialNFT, "PropertyMinted")
        .withArgs(0, seller.address, PROPERTY_ADDRESS, PRICE_USD);
    });
  });

  describe("PropertyEscrow", function () {
    let tokenId;

    beforeEach(async function () {
      // Mint property to seller
      const tx = await notarialNFT.mintProperty(
        seller.address,
        PROPERTY_ADDRESS,
        CADASTRAL_CODE,
        PRICE_USD,
        SELLER_CUIT,
        BUYER_CUIT,
        IPFS_HASH,
        TOKEN_URI
      );
      await tx.wait();
      tokenId = 0;
    });

    it("Should create a transfer", async function () {
      const tx = await propertyEscrow
        .connect(seller)
        .createTransfer(tokenId, buyer.address, PRICE_USD);

      await expect(tx)
        .to.emit(propertyEscrow, "TransferCreated")
        .withArgs(0, tokenId, seller.address, buyer.address, PRICE_USD);

      const transfer = await propertyEscrow.getTransfer(0);
      expect(transfer.seller).to.equal(seller.address);
      expect(transfer.buyer).to.equal(buyer.address);
      expect(transfer.priceUSD).to.equal(PRICE_USD);
    });

    it("Should complete atomic swap", async function () {
      // Create transfer
      await propertyEscrow
        .connect(seller)
        .createTransfer(tokenId, buyer.address, PRICE_USD);

      // Seller approves NFT to escrow
      await notarialNFT
        .connect(seller)
        .approve(await propertyEscrow.getAddress(), tokenId);

      // Buyer approves USDC to escrow
      await usdc
        .connect(buyer)
        .approve(await propertyEscrow.getAddress(), PRICE_USD);

      // Seller deposits NFT
      await propertyEscrow.connect(seller).sellerApprove(0);

      // Buyer deposits USDC (this should trigger completion)
      const tx = await propertyEscrow.connect(buyer).buyerApprove(0);

      await expect(tx)
        .to.emit(propertyEscrow, "TransferCompleted")
        .withArgs(0, tokenId, seller.address, buyer.address, PRICE_USD);

      // Verify NFT transferred to buyer
      const newOwner = await notarialNFT.ownerOf(tokenId);
      expect(newOwner).to.equal(buyer.address);

      // Verify USDC transferred to seller
      const sellerBalance = await usdc.balanceOf(seller.address);
      expect(sellerBalance).to.equal(PRICE_USD);
    });

    it("Should allow cancellation", async function () {
      // Create transfer
      await propertyEscrow
        .connect(seller)
        .createTransfer(tokenId, buyer.address, PRICE_USD);

      // Cancel before any approvals
      await expect(propertyEscrow.connect(seller).cancelTransfer(0))
        .to.emit(propertyEscrow, "TransferCancelled")
        .withArgs(0);
    });
  });
});

// Mock ERC20 contract for testing
// In production, use actual USDC on Scroll
