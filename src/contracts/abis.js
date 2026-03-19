// NotarialNFT ABI - Essential functions for frontend
export const NotarialNFT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "string", "name": "propertyAddress", "type": "string" },
      { "internalType": "string", "name": "cadastralCode", "type": "string" },
      { "internalType": "uint256", "name": "priceUSD", "type": "uint256" },
      { "internalType": "string", "name": "sellerCUIT", "type": "string" },
      { "internalType": "string", "name": "buyerCUIT", "type": "string" },
      { "internalType": "string", "name": "ipfsHash", "type": "string" },
      { "internalType": "string", "name": "tokenURI", "type": "string" }
    ],
    "name": "mintProperty",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "getProperty",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "propertyAddress", "type": "string" },
          { "internalType": "string", "name": "cadastralCode", "type": "string" },
          { "internalType": "uint256", "name": "priceUSD", "type": "uint256" },
          { "internalType": "string", "name": "sellerCUIT", "type": "string" },
          { "internalType": "string", "name": "buyerCUIT", "type": "string" },
          { "internalType": "uint256", "name": "mintedAt", "type": "uint256" },
          { "internalType": "string", "name": "ipfsHash", "type": "string" }
        ],
        "internalType": "struct NotarialNFT.PropertyMetadata",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalProperties",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "ownerOf",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "propertyAddress", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "priceUSD", "type": "uint256" }
    ],
    "name": "PropertyMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "priceUSD", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "PropertyTransferred",
    "type": "event"
  }
];

// PropertyEscrow ABI - Essential functions for frontend
export const PropertyEscrow_ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "internalType": "address", "name": "buyer", "type": "address" },
      { "internalType": "uint256", "name": "priceUSD", "type": "uint256" }
    ],
    "name": "createTransfer",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "transferId", "type": "uint256" }],
    "name": "sellerApprove",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "transferId", "type": "uint256" }],
    "name": "buyerApprove",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "transferId", "type": "uint256" }],
    "name": "cancelTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "transferId", "type": "uint256" }],
    "name": "getTransfer",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
          { "internalType": "address", "name": "seller", "type": "address" },
          { "internalType": "address", "name": "buyer", "type": "address" },
          { "internalType": "uint256", "name": "priceUSD", "type": "uint256" },
          { "internalType": "bool", "name": "sellerApproved", "type": "bool" },
          { "internalType": "bool", "name": "buyerApproved", "type": "bool" },
          { "internalType": "bool", "name": "completed", "type": "bool" },
          { "internalType": "uint256", "name": "createdAt", "type": "uint256" }
        ],
        "internalType": "struct PropertyEscrow.Transfer",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "transferId", "type": "uint256" },
      { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "seller", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "buyer", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "priceUSD", "type": "uint256" }
    ],
    "name": "TransferCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "transferId", "type": "uint256" },
      { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "seller", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "buyer", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "priceUSD", "type": "uint256" }
    ],
    "name": "TransferCompleted",
    "type": "event"
  }
];

// ERC20 ABI for USDC
export const ERC20_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];
