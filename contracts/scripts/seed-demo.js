const hre = require("hardhat");

async function main() {
  console.log("🌱 Seeding demo properties...");

  // Load deployed contract addresses
  const fs = require("fs");
  const path = require("path");
  const deploymentsPath = path.join(__dirname, "../deployments");
  
  // Get latest deployment
  const files = fs.readdirSync(deploymentsPath);
  const latestDeployment = files
    .filter(f => f.startsWith("scroll-"))
    .sort()
    .reverse()[0];

  if (!latestDeployment) {
    console.error("❌ No deployment found. Run 'npm run deploy' first.");
    process.exit(1);
  }

  const deployment = JSON.parse(
    fs.readFileSync(path.join(deploymentsPath, latestDeployment), "utf8")
  );

  const nftAddress = deployment.contracts.NotarialNFT;
  console.log("📄 Using NotarialNFT at:", nftAddress);

  const [signer] = await hre.ethers.getSigners();
  const NotarialNFT = await hre.ethers.getContractAt("NotarialNFT", nftAddress, signer);

  // Demo properties
  const properties = [
    {
      address: "Av. Libertador 5432, Palermo, CABA",
      cadastral: "14-28-001-0045-0000-3",
      price: 250000,
      sellerCUIT: "20-12345678-9",
      buyerCUIT: "27-98765432-1",
      ipfs: "QmDemo1PropertyDocuments",
    },
    {
      address: "Calle Corrientes 1234, San Nicolás, CABA",
      cadastral: "14-01-002-0123-0000-1",
      price: 180000,
      sellerCUIT: "20-23456789-0",
      buyerCUIT: "27-87654321-2",
      ipfs: "QmDemo2PropertyDocuments",
    },
    {
      address: "Av. Santa Fe 2345, Recoleta, CABA",
      cadastral: "14-14-003-0234-0000-5",
      price: 320000,
      sellerCUIT: "20-34567890-1",
      buyerCUIT: "27-76543210-3",
      ipfs: "QmDemo3PropertyDocuments",
    },
    {
      address: "Av. Cabildo 3456, Belgrano, CABA",
      cadastral: "14-13-004-0345-0000-2",
      price: 290000,
      sellerCUIT: "20-45678901-2",
      buyerCUIT: "27-65432109-4",
      ipfs: "QmDemo4PropertyDocuments",
    },
    {
      address: "Av. Rivadavia 4567, Caballito, CABA",
      cadastral: "14-06-005-0456-0000-8",
      price: 195000,
      sellerCUIT: "20-56789012-3",
      buyerCUIT: "27-54321098-5",
      ipfs: "QmDemo5PropertyDocuments",
    },
  ];

  console.log("\n🏠 Minting properties...\n");

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    
    try {
      const tokenURI = `ipfs://${prop.ipfs}/metadata.json`;
      
      const tx = await NotarialNFT.mintProperty(
        signer.address,
        prop.address,
        prop.cadastral,
        prop.price,
        prop.sellerCUIT,
        prop.buyerCUIT,
        prop.ipfs,
        tokenURI
      );

      await tx.wait();
      
      console.log(`✅ Property ${i + 1} minted:`);
      console.log(`   Address: ${prop.address}`);
      console.log(`   Price: $${prop.price.toLocaleString()} USD`);
      console.log(`   Cadastral: ${prop.cadastral}`);
      console.log(`   Tx: ${tx.hash}\n`);
    } catch (error) {
      console.error(`❌ Failed to mint property ${i + 1}:`, error.message);
    }
  }

  const totalProperties = await NotarialNFT.totalProperties();
  console.log("=".repeat(60));
  console.log(`🎉 Seeding complete! Total properties: ${totalProperties}`);
  console.log("=".repeat(60));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
