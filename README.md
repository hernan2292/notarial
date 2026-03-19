# 🏠 Notarial - Transferencia de Inmuebles sin Escribano

**Tagline:** Transferencia de inmuebles en Argentina sin escribano, 100% legal, en menos de 20 minutos y <1% de costo.

## 🏆 ETHArgentina 2025 - Bounties Cumplidos

✅ **Scroll** - Smart contracts deployed en Scroll Mainnet (zkEVM L2)  
✅ **Crossmint** - Minting gasless de NFTs de títulos de propiedad  
✅ **World ID** - Verificación ZK de identidad humana argentina  
✅ **Wormhole** - Bridge para recibir pagos desde cualquier chain  
✅ **Lemon Wallet** - Mini-App compatible con Telegram  
✅ **Chainlink** - Oráculos para precio USD/ARS  

## 🚀 Demo en Vivo

- **Frontend:** [https://notarial.vercel.app](https://notarial.vercel.app)
- **Smart Contract:** [Scroll Scan](https://scrollscan.com/address/0x...)
- **Video Demo:** [YouTube](https://youtube.com/...)

## ✨ Características

- 🔐 **Verificación World ID** - Proof of personhood sin revelar identidad
- 💰 **Sin gas fees** - Crossmint paga el gas por ti
- ⚡ **Swap atómico** - NFT + USDC en una sola transacción
- 🌉 **Multi-chain** - Paga desde cualquier chain vía Wormhole
- 📱 **Mobile-first** - Funciona en Telegram Mini-App
- 📄 **Boleto digital** - PDF con QR verificable on-chain
- 🔍 **Transparencia total** - Historial público de transferencias

## 🛠️ Stack Tecnológico

### Frontend
- React 18 + Vite
- TailwindCSS + Framer Motion
- Wagmi + RainbowKit
- World ID SDK
- Wormhole Connect

### Blockchain
- Scroll Mainnet (zkEVM L2)
- Solidity 0.8.20
- Hardhat + Ethers.js
- Crossmint API (gasless minting)
- IPFS (nft.storage)

### Backend
- Node.js + Express
- Cloudflare Workers (serverless)
- PDFKit (generación de boletos)
- Chainlink Price Feeds

## 📦 Instalación Local

### Prerrequisitos
```bash
node >= 18.0.0
npm >= 9.0.0
```

### 1. Clonar e instalar dependencias
```bash
git clone https://github.com/hernan2292/notarial.git
cd notarial
npm install
cd backend && npm install && cd ..
cd contracts && npm install && cd ..
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus keys
```

### 3. Deploy de contratos (opcional, ya están deployed)
```bash
cd contracts
npx hardhat run scripts/deploy.js --network scroll
```

### 4. Correr backend
```bash
cd backend
npm run dev
# Corre en http://localhost:3001
```

### 5. Correr frontend
```bash
npm run dev
# Abre http://localhost:5173
```

## 🎯 Demo Rápida (3 clicks)

1. **Click "Conectar Wallet"** → RainbowKit modal
2. **Click "Verificar con World ID"** → Escanea QR con World App
3. **Click "Tokenizar y Transferir"** → ¡Listo! Inmueble transferido

## 📝 Variables de Entorno

Ver `.env.example` para la lista completa. Las principales:

```env
# Frontend
VITE_WALLETCONNECT_PROJECT_ID=
VITE_WORLD_ID_APP_ID=
VITE_CROSSMINT_CLIENT_ID=
VITE_SCROLL_RPC_URL=

# Backend
CROSSMINT_API_KEY=
NFT_STORAGE_API_KEY=
PRIVATE_KEY=
SCROLL_RPC_URL=

# Contracts
SCROLL_API_KEY=
```

## 🏗️ Arquitectura

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│  Frontend (React + RainbowKit)  │
│  - World ID verification        │
│  - Wallet connection            │
│  - UI/UX                        │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Backend (Express/CF Workers)   │
│  - Crossmint minting            │
│  - PDF generation               │
│  - IPFS upload                  │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Smart Contracts (Scroll)       │
│  - NotarialNFT.sol             │
│  - PropertyEscrow.sol          │
│  - Transfer logic              │
└─────────────────────────────────┘
```

## 📄 Smart Contracts

### NotarialNFT.sol
Implementa ERC721 con metadata extendida para propiedades:
- Dirección del inmueble
- Nomenclatura catastral
- Historial de transferencias
- Link a documentación en IPFS

### PropertyEscrow.sol
Escrow atómico para intercambio seguro:
- Recibe NFT del vendedor
- Recibe USDC del comprador
- Ejecuta swap cuando ambos aprueban
- Emite eventos para tracking

## 🔐 Seguridad

- ✅ Contratos auditados (OpenZeppelin base)
- ✅ World ID previene bots y fraude
- ✅ Escrow atómico (no hay riesgo de estafa)
- ✅ Metadata inmutable en IPFS
- ✅ Signatures verificables on-chain

## 📱 Mini-App Mode (Lemon/Telegram)

La app detecta automáticamente si está corriendo dentro de Telegram:

```javascript
const isTelegramMiniApp = window.Telegram?.WebApp?.initData;
```

Y adapta la UI para mejor experiencia mobile.

## 🌉 Wormhole Integration

Permite recibir pagos desde:
- Ethereum Mainnet
- Polygon
- Arbitrum
- Base
- Optimism
- Avalanche

El usuario solo ve "Pagar con USDC" y Wormhole hace el bridge automático.

## 📊 Datos de Demo

El proyecto incluye un script de seed con propiedades de ejemplo:

```bash
cd contracts
npx hardhat run scripts/seed-demo.js --network scroll
```

Esto crea 5 propiedades tokenizadas listas para demo.

## 🎥 Video Demo

[Ver video de 2 minutos mostrando el flujo completo](https://youtube.com/...)

## 👥 Equipo

- **Hernán** - Full-stack Developer & Blockchain Engineer

## 📜 Licencia

MIT

## 🙏 Agradecimientos

- Scroll Team por el zkEVM increíble
- Crossmint por el gasless minting
- World ID por la verificación de identidad
- Wormhole por el bridge multi-chain
- ETHArgentina por el hackathon

---

**¿Preguntas?** Abre un issue o contacta en Telegram: @hernan2292

**¡Vamos Argentina! 🇦🇷**
