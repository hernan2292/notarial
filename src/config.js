// Environment variables with fallbacks
export const config = {
  // WalletConnect
  walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo_project_id',
  
  // World ID
  worldIdAppId: import.meta.env.VITE_WORLD_ID_APP_ID || 'app_staging_demo',
  worldIdAction: import.meta.env.VITE_WORLD_ID_ACTION || 'verify-human-argentina',
  
  // Crossmint
  crossmintClientId: import.meta.env.VITE_CROSSMINT_CLIENT_ID || '',
  
  // Scroll Network
  scrollRpcUrl: import.meta.env.VITE_SCROLL_RPC_URL || 'https://rpc.scroll.io',
  scrollChainId: parseInt(import.meta.env.VITE_SCROLL_CHAIN_ID || '534352'),
  
  // Contract Addresses (will be updated after deployment)
  notarialNFTAddress: import.meta.env.VITE_NOTARIAL_NFT_ADDRESS || '0x0000000000000000000000000000000000000000',
  propertyEscrowAddress: import.meta.env.VITE_PROPERTY_ESCROW_ADDRESS || '0x0000000000000000000000000000000000000000',
  usdcAddress: import.meta.env.VITE_USDC_ADDRESS || '0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4', // USDC on Scroll
  
  // Backend
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',
  
  // IPFS
  ipfsGateway: import.meta.env.VITE_IPFS_GATEWAY || 'https://nftstorage.link/ipfs/',
  
  // Wormhole
  wormholeProjectId: import.meta.env.VITE_WORMHOLE_CONNECT_PROJECT_ID || '',
  
  // Chainlink
  chainlinkUsdArsFeed: import.meta.env.VITE_CHAINLINK_USD_ARS_FEED || '0x0000000000000000000000000000000000000000',
  
  // App Info
  appName: 'Notarial',
  appDescription: 'Transferencia de inmuebles sin escribano',
  appUrl: 'https://notarial.vercel.app',
};

// Scroll Network Configuration
export const scrollNetwork = {
  id: config.scrollChainId,
  name: 'Scroll',
  network: 'scroll',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [config.scrollRpcUrl],
    },
    public: {
      http: [config.scrollRpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: 'Scrollscan',
      url: 'https://scrollscan.com',
    },
  },
  testnet: false,
};

// Check if running in Telegram Mini App
export const isTelegramMiniApp = () => {
  return typeof window !== 'undefined' && window.Telegram?.WebApp?.initData;
};

// Get Telegram user data
export const getTelegramUser = () => {
  if (isTelegramMiniApp()) {
    return window.Telegram.WebApp.initDataUnsafe?.user;
  }
  return null;
};

console.log('🚀 Notarial Config Loaded:', {
  network: scrollNetwork.name,
  chainId: config.scrollChainId,
  isTelegram: isTelegramMiniApp(),
});
