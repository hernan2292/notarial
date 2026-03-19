# 🚀 Guía de Deployment y Demo - Notarial

## 📋 Pre-requisitos

1. **Node.js 18+** instalado
2. **Wallet con ETH en Scroll Mainnet** para deployment de contratos
3. **API Keys** necesarias:
   - WalletConnect Project ID
   - World ID App ID
   - Crossmint API Key
   - NFT.Storage API Key
   - Scroll API Key (para verificación)

## 🔧 Setup Inicial

### 1. Instalar Dependencias

```bash
# Root (Frontend)
npm install

# Backend
cd backend
npm install
cd ..

# Contracts
cd contracts
npm install
cd ..
```

### 2. Configurar Variables de Entorno

```bash
# Copiar .env.example a .env
cp .env.example .env

# Editar .env con tus API keys
```

**Variables críticas:**
- `VITE_WALLETCONNECT_PROJECT_ID` - Obtener en https://cloud.walletconnect.com
- `VITE_WORLD_ID_APP_ID` - Obtener en https://developer.worldcoin.org
- `CROSSMINT_API_KEY` - Obtener en https://crossmint.com
- `NFT_STORAGE_API_KEY` - Obtener en https://nft.storage
- `PRIVATE_KEY` - Tu private key para deployment (¡NUNCA commitear!)

## 🔨 Deployment de Smart Contracts

### 1. Compilar Contratos

```bash
cd contracts
npm run compile
```

### 2. Deploy a Scroll Mainnet

```bash
# Asegurarse de tener ETH en tu wallet
npm run deploy

# Output esperado:
# ✅ NotarialNFT deployed to: 0x...
# ✅ PropertyEscrow deployed to: 0x...
```

### 3. Verificar Contratos en Scrollscan

```bash
# Verificar NotarialNFT
npx hardhat verify --network scroll <NOTARIAL_NFT_ADDRESS>

# Verificar PropertyEscrow
npx hardhat verify --network scroll <PROPERTY_ESCROW_ADDRESS> <NOTARIAL_NFT_ADDRESS> <USDC_ADDRESS>
```

### 4. Actualizar .env con Direcciones

Copiar las direcciones de los contratos deployados al archivo `.env`:

```env
VITE_NOTARIAL_NFT_ADDRESS=0x...
VITE_PROPERTY_ESCROW_ADDRESS=0x...
```

### 5. Seed de Datos Demo (Opcional)

```bash
npm run seed
```

Esto creará 5 propiedades de ejemplo para la demo.

## 🌐 Deployment del Backend

### Opción A: Local (para desarrollo)

```bash
cd backend
npm run dev
# Corre en http://localhost:3001
```

### Opción B: Vercel (producción)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd backend
vercel

# Configurar variables de entorno en Vercel Dashboard:
# - CROSSMINT_API_KEY
# - NFT_STORAGE_API_KEY
# - NOTARIAL_NFT_ADDRESS
# - PROPERTY_ESCROW_ADDRESS
```

Actualizar `.env` con la URL del backend:

```env
VITE_BACKEND_URL_PROD=https://tu-backend.vercel.app
```

## 🎨 Deployment del Frontend

### Opción A: Local (para desarrollo)

```bash
npm run dev
# Abre http://localhost:5173
```

### Opción B: Vercel (producción)

```bash
# Deploy
vercel

# Configurar variables de entorno en Vercel Dashboard
# (ver .env.example para la lista completa)
```

## 🎯 Demo para el Jurado (3 clicks)

### Preparación (5 minutos antes)

1. **Abrir la app** en el navegador
2. **Conectar wallet** con RainbowKit
3. **Tener World App** instalada en el celular
4. **Tener USDC** en Scroll (para demo completa)

### Flow de Demo (2 minutos)

#### Click 1: Conectar Wallet
- Click en "Conectar Wallet"
- Seleccionar MetaMask/Rainbow/etc
- Aprobar conexión

#### Click 2: Verificar World ID
- Click en "Verificar con World ID"
- Escanear QR con World App
- Aprobar verificación
- ✅ "Identidad verificada"

#### Click 3: Transferir Propiedad
- Formulario se muestra automáticamente
- Completar datos:
  - CUIT Vendedor: `20-12345678-9`
  - CUIT Comprador: `27-98765432-1`
  - Dirección: `Av. Libertador 5432, CABA`
  - Precio: `250000` USD
- Click "Tokenizar y Transferir"
- Ver proceso en tiempo real:
  1. ⏳ Tokenizando propiedad...
  2. ⏳ Preparando transferencia...
  3. ✅ ¡Transferencia completada!
- PDF se descarga automáticamente

### Puntos a Destacar Durante la Demo

1. **"Sin gas fees"** - Usuario nunca paga gas (Crossmint)
2. **"Menos de 20 minutos"** - Mostrar timer real
3. **"<1% de costo"** - Mostrar comparación de costos
4. **"100% seguro"** - Explicar escrow atómico
5. **"Verificación World ID"** - Proof of personhood
6. **"Multi-chain"** - Mencionar Wormhole bridge
7. **"Boleto legal"** - Mostrar PDF con QR verificable

## 🎬 Video Demo

### Script de Video (2 minutos)

```
[0:00-0:15] Intro
"Hola, soy Hernán y les presento Notarial: transferencia de inmuebles 
sin escribano, 100% legal, en menos de 20 minutos."

[0:15-0:30] Problema
"Hoy, transferir una propiedad en Argentina toma 30-60 días y cuesta 
3-5% del valor. Eso es $10,000 USD en una propiedad de $250,000."

[0:30-1:00] Solución
"Con Notarial, lo hacés en 3 clicks:
1. Conectás tu wallet
2. Verificás tu identidad con World ID
3. Transferís la propiedad"

[1:00-1:30] Demo en vivo
[Mostrar pantalla haciendo los 3 clicks]

[1:30-1:45] Tecnología
"Usamos Scroll para zkEVM L2, Crossmint para gasless minting, 
World ID para identidad, y Wormhole para pagos multi-chain."

[1:45-2:00] Cierre
"Notarial: democratizando el acceso a la propiedad en Argentina.
Gracias."
```

### Grabar Video

```bash
# Usar OBS Studio o similar
# Resolución: 1920x1080
# FPS: 30
# Formato: MP4
# Duración: 2 minutos máximo
```

## 📊 Checklist Pre-Demo

- [ ] Contratos deployados y verificados en Scroll
- [ ] Backend corriendo (local o Vercel)
- [ ] Frontend corriendo (local o Vercel)
- [ ] Wallet conectada con ETH en Scroll
- [ ] World App instalada y configurada
- [ ] USDC en wallet (para demo completa)
- [ ] Datos de demo preparados
- [ ] Video grabado y subido
- [ ] README actualizado con links
- [ ] Slides de presentación listos

## 🐛 Troubleshooting

### Error: "Failed to mint property"
- Verificar que el backend esté corriendo
- Verificar API keys de Crossmint
- Ver logs del backend

### Error: "Transaction failed"
- Verificar que tengas ETH en Scroll
- Verificar que las direcciones de contratos sean correctas
- Verificar que el contrato esté verificado

### Error: "World ID verification failed"
- Verificar World ID App ID
- Verificar que estés usando World App actualizada
- Probar con otro dispositivo

### Error: "CORS error"
- Verificar CORS_ORIGIN en backend
- Verificar que el backend esté accesible

## 📞 Soporte

Si tenés problemas durante el hackathon:
1. Revisar logs del browser (F12)
2. Revisar logs del backend
3. Revisar transacciones en Scrollscan
4. Contactar en Telegram: @hernan2292

## 🏆 Bounties Checklist

- [x] **Scroll** - Contratos en Scroll Mainnet
- [x] **Crossmint** - Gasless minting de NFTs
- [x] **World ID** - Verificación de identidad
- [x] **Wormhole** - Bridge multi-chain (integrado)
- [x] **Lemon Wallet** - Compatible con Mini-App
- [x] **Chainlink** - Oráculos (opcional)

---

**¡Éxitos en ETHArgentina 2025! 🇦🇷🚀**
