const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Notarial contracts to Scroll...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy NotarialNFT
  console.log("\n📄 Deploying NotarialNFT...");
  const NotarialNFT = await hre.ethers.getContractFactory("NotarialNFT");
  const notarialNFT = await NotarialNFT.deploy();
  await notarialNFT.waitForDeployment();
  const nftAddress = await notarialNFT.getAddress();
  console.log("✅ NotarialNFT deployed to:", nftAddress);

  // USDC address on Scroll Mainnet
  const USDC_ADDRESS = "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4";
  console.log("💵 Using USDC at:", USDC_ADDRESS);

  // Deploy PropertyEscrow
  console.log("\n🔒 Deploying PropertyEscrow...");
  const PropertyEscrow = await hre.ethers.getContractFactory("PropertyEscrow");
  const propertyEscrow = await PropertyEscrow.deploy(nftAddress, USDC_ADDRESS);
  await propertyEscrow.waitForDeployment();
  const escrowAddress = await propertyEscrow.getAddress();
  console.log("✅ PropertyEscrow deployed to:", escrowAddress);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT SUCCESSFUL!");
  console.log("=".repeat(60));
  console.log("\n📋 Contract Addresses:");
  console.log("   NotarialNFT:     ", nftAddress);
  console.log("   PropertyEscrow:  ", escrowAddress);
  console.log("   USDC:            ", USDC_ADDRESS);
  console.log("\n🔗 Network: Scroll Mainnet");
  console.log("🔍 Verify on: https://scrollscan.com");
  console.log("\n💡 Next steps:");
  console.log("   1. Update .env with contract addresses");
  console.log("   2. Verify contracts: npm run verify");
  console.log("   3. Seed demo data: npm run seed");
  console.log("=".repeat(60));

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    chainId: (await hre.ethers.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    contracts: {
      NotarialNFT: nftAddress,
      PropertyEscrow: escrowAddress,
      USDC: USDC_ADDRESS,
    },
    timestamp: new Date().toISOString(),
  };

  const fs = require("fs");
  const path = require("path");
  const deploymentPath = path.join(__dirname, "../deployments");
  
  if (!fs.existsSync(deploymentPath)) {
    fs.mkdirSync(deploymentPath, { recursive: true });
  }

  fs.writeFileSync(
    path.join(deploymentPath, `scroll-${Date.now()}.json`),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n💾 Deployment info saved to deployments/");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
