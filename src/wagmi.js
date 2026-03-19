import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { scrollNetwork, config } from './config';

// Configure chains
const chains = [scrollNetwork];

// RainbowKit configuration
export const wagmiConfig = getDefaultConfig({
  appName: config.appName,
  projectId: config.walletConnectProjectId,
  chains,
  ssr: false,
});

console.log('⚡ Wagmi Config initialized with chains:', chains.map(c => c.name));
