const hre = require("hardhat");

async function main() {
    console.log("🏙️ Simulating property transfer for a lot in Buenos Aires...");

    const [seller, buyer] = await hre.ethers.getSigners();
    console.log("👤 Seller address:", seller.address);
    console.log("👤 Buyer address:", buyer.address);

    // 1. Deploy Contracts
    console.log("\n📦 Deploying NotarialNFT...");
    const NotarialNFT = await hre.ethers.getContractFactory("NotarialNFT");
    const nft = await NotarialNFT.deploy();
    await nft.waitForDeployment();
    const nftAddr = await nft.getAddress();
    console.log("✅ NotarialNFT deployed at:", nftAddr);

    console.log("\n📦 Deploying Mock USDC...");
    const MockUSDC = await hre.ethers.getContractFactory("MockERC20");
    const usdc = await MockUSDC.deploy("Mock USDC", "mUSDC", 6);
    await usdc.waitForDeployment();
    const usdcAddr = await usdc.getAddress();
    console.log("✅ Mock USDC deployed at:", usdcAddr);

    console.log("\n📦 Deploying PropertyEscrow...");
    const Escrow = await hre.ethers.getContractFactory("PropertyEscrow");
    const escrow = await Escrow.deploy(nftAddr, usdcAddr);
    await escrow.waitForDeployment();
    const escrowAddr = await escrow.getAddress();
    console.log("✅ PropertyEscrow deployed at:", escrowAddr);

    // 2. Mint Property (The Lot in BA)
    console.log("\n🏠 Minting Lot in Buenos Aires...");
    const propertyData = {
        address: "Av. Del Libertador 1500, Vicente López, Buenos Aires",
        cadastral: "16-045-021-0000",
        price: 500000, // $500,000 USD
        sellerCUIT: "20-12345678-9",
        buyerCUIT: "27-98765432-1",
        ipfs: "QmLotInBA123456789Docs",
        tokenURI: "ipfs://QmLotInBA123456789Docs/metadata.json"
    };

    const mintTx = await nft.mintProperty(
        seller.address,
        propertyData.address,
        propertyData.cadastral,
        propertyData.price,
        propertyData.sellerCUIT,
        propertyData.buyerCUIT,
        propertyData.ipfs,
        propertyData.tokenURI
    );
    const receipt = await mintTx.wait();
    const tokenId = 0; // First token
    console.log(`✅ Property minted! Token ID: ${tokenId} (Tx: ${mintTx.hash})`);

    // 3. Setup Sale
    const salePrice = hre.ethers.parseUnits("500000", 6); // 500k with 6 decimals

    // Buyer needs USDC
    console.log("\n💰 Funding buyer with USDC...");
    await usdc.mint(buyer.address, salePrice);
    console.log("✅ Buyer balance:", hre.ethers.formatUnits(await usdc.balanceOf(buyer.address), 6), "mUSDC");

    // 4. Create Transfer in Escrow
    console.log("\n📝 Creating transfer in Escrow...");
    const createTx = await escrow.connect(seller).createTransfer(tokenId, buyer.address, salePrice);
    await createTx.wait();
    const transferId = 0;
    console.log("✅ Transfer created. ID:", transferId);

    // 5. Approvals
    console.log("\n🔓 Approving NFT and USDC...");
    
    // Seller approves NFT for Escrow
    await nft.connect(seller).approve(escrowAddr, tokenId);
    // Buyer approves USDC for Escrow
    await usdc.connect(buyer).approve(escrowAddr, salePrice);
    console.log("✅ Approvals granted.");

    // 6. Atomic Swap
    console.log("\n🤝 Executing Atomic Swap...");
    
    console.log("   - Seller approving...");
    const sApproveTx = await escrow.connect(seller).sellerApprove(transferId);
    await sApproveTx.wait();

    console.log("   - Buyer approving...");
    const bApproveTx = await escrow.connect(buyer).buyerApprove(transferId);
    await bApproveTx.wait();

    console.log("\n✨ TRANSFER COMPLETED! ✨");

    // 7. Verify Ownership
    const newOwner = await nft.ownerOf(tokenId);
    const sellerBalance = await usdc.balanceOf(seller.address);
    
    console.log("\n📊 Final Status:");
    console.log("   Property Address:", propertyData.address);
    console.log("   New Owner Address:", newOwner);
    console.log("   Seller Final Balance:", hre.ethers.formatUnits(sellerBalance, 6), "mUSDC");
    
    if (newOwner === buyer.address && sellerBalance === salePrice) {
        console.log("\n🏆 SIMULATION SUCCESSFUL: Ownership and funds swapped correctly.");
    } else {
        console.log("\n❌ SIMULATION FAILED: Unexpected state.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
