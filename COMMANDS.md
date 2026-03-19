# 🛠️ Comandos Útiles - Notarial

## 📦 Instalación

### Setup Completo (Recomendado)
```bash
# Ejecutar script de setup automático
chmod +x setup.sh
./setup.sh
```

### Setup Manual
```bash
# Frontend
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

---

## 🎨 Frontend

### Desarrollo
```bash
npm run dev                 # Iniciar servidor de desarrollo
npm run build              # Build para producción
npm run preview            # Preview del build
npm run lint               # Linter
```

### URLs
- Desarrollo: http://localhost:5173
- Preview: http://localhost:4173

---

## 🔧 Backend

### Desarrollo
```bash
cd backend
npm run dev                # Desarrollo con hot reload
npm start                  # Producción
```

### Testing
```bash
# Health check
curl http://localhost:3001/health

# Mint property (ejemplo)
curl -X POST http://localhost:3001/api/mint-property \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "0x...",
    "propertyAddress": "Av. Libertador 5432, CABA",
    "sellerCUIT": "20-12345678-9",
    "buyerCUIT": "27-98765432-1",
    "priceUSD": "250000"
  }'
```

### URLs
- Desarrollo: http://localhost:3001
- Producción: https://notarial-api.vercel.app

---

## ⛓️ Smart Contracts

### Compilación
```bash
cd contracts
npm run compile            # Compilar contratos
npx hardhat clean          # Limpiar artifacts
```

### Testing
```bash
npm run test               # Correr todos los tests
npx hardhat test --grep "NotarialNFT"  # Test específico
npx hardhat coverage       # Coverage report
```

### Deployment

#### Scroll Mainnet
```bash
npm run deploy             # Deploy a Scroll Mainnet
npm run verify             # Verificar en Scrollscan
```

#### Scroll Testnet (Sepolia)
```bash
npm run deploy:testnet     # Deploy a Scroll Sepolia
```

### Interacción con Contratos
```bash
# Abrir consola de Hardhat
npx hardhat console --network scroll

# En la consola:
const NotarialNFT = await ethers.getContractFactory("NotarialNFT");
const nft = await NotarialNFT.attach("0x...");
const total = await nft.totalProperties();
console.log("Total properties:", total.toString());
```

### Seed de Datos Demo
```bash
npm run seed               # Crear 5 propiedades de demo
```

### Verificación en Scrollscan
```bash
# NotarialNFT
npx hardhat verify --network scroll <NFT_ADDRESS>

# PropertyEscrow
npx hardhat verify --network scroll <ESCROW_ADDRESS> <NFT_ADDRESS> <USDC_ADDRESS>
```

---

## 🚀 Deployment

### Frontend a Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Backend a Vercel
```bash
cd backend
vercel
vercel --prod
```

### Variables de Entorno en Vercel
```bash
# Agregar variable
vercel env add VITE_WALLETCONNECT_PROJECT_ID

# Listar variables
vercel env ls

# Pull variables localmente
vercel env pull
```

---

## 🔍 Debugging

### Logs del Frontend
```bash
# Abrir DevTools en el navegador
# F12 o Cmd+Option+I (Mac)

# Ver logs de Wagmi
localStorage.setItem('wagmi.debug', 'true')

# Ver logs de RainbowKit
localStorage.setItem('rainbowkit.debug', 'true')
```

### Logs del Backend
```bash
# Ver logs en tiempo real
cd backend
npm run dev

# Ver logs de Vercel
vercel logs
```

### Logs de Contratos
```bash
# Ver eventos en Scrollscan
# https://scrollscan.com/address/<CONTRACT_ADDRESS>#events

# Ver transacciones
# https://scrollscan.com/tx/<TX_HASH>
```

---

## 🧪 Testing

### Frontend (Manual)
```bash
# 1. Iniciar backend
cd backend && npm run dev

# 2. En otra terminal, iniciar frontend
npm run dev

# 3. Abrir http://localhost:5173
# 4. Conectar wallet
# 5. Verificar World ID
# 6. Probar transferencia
```

### Contratos (Automatizado)
```bash
cd contracts
npm run test

# Con coverage
npx hardhat coverage

# Con gas report
REPORT_GAS=true npm run test
```

---

## 📊 Análisis

### Bundle Size
```bash
npm run build
npx vite-bundle-visualizer
```

### Gas Report
```bash
cd contracts
REPORT_GAS=true npm run test
```

### Lighthouse (Performance)
```bash
npm run build
npx lighthouse http://localhost:4173 --view
```

---

## 🔧 Utilidades

### Limpiar Todo
```bash
# Limpiar node_modules
rm -rf node_modules backend/node_modules contracts/node_modules

# Limpiar builds
rm -rf dist backend/dist contracts/artifacts contracts/cache

# Reinstalar
npm install
cd backend && npm install && cd ..
cd contracts && npm install && cd ..
```

### Actualizar Dependencias
```bash
# Ver outdated
npm outdated

# Actualizar
npm update

# Actualizar a latest
npx npm-check-updates -u
npm install
```

### Git
```bash
# Inicializar repo
git init
git add .
git commit -m "Initial commit - Notarial for ETHArgentina 2025"

# Crear repo en GitHub y push
git remote add origin https://github.com/hernan2292/notarial.git
git branch -M main
git push -u origin main
```

---

## 🌐 URLs Importantes

### Desarrollo
- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- Backend Health: http://localhost:3001/health

### Producción (actualizar después del deploy)
- Frontend: https://notarial.vercel.app
- Backend: https://notarial-api.vercel.app
- GitHub: https://github.com/hernan2292/notarial

### Blockchain
- Scrollscan: https://scrollscan.com
- Scroll RPC: https://rpc.scroll.io
- Scroll Docs: https://docs.scroll.io

### APIs
- Crossmint: https://www.crossmint.com
- World ID: https://developer.worldcoin.org
- NFT.Storage: https://nft.storage
- WalletConnect: https://cloud.walletconnect.com

---

## 🔑 Variables de Entorno

### Obtener API Keys

#### WalletConnect
```bash
# 1. Ir a https://cloud.walletconnect.com
# 2. Crear cuenta
# 3. Crear nuevo proyecto
# 4. Copiar Project ID
```

#### World ID
```bash
# 1. Ir a https://developer.worldcoin.org
# 2. Crear cuenta
# 3. Crear nueva app
# 4. Copiar App ID
```

#### Crossmint
```bash
# 1. Ir a https://www.crossmint.com
# 2. Crear cuenta
# 3. Ir a API Keys
# 4. Copiar Server API Key
```

#### NFT.Storage
```bash
# 1. Ir a https://nft.storage
# 2. Crear cuenta
# 3. Ir a API Keys
# 4. Crear nueva key
```

---

## 📱 Testing en Mobile

### Usando Ngrok
```bash
# Instalar ngrok
npm i -g ngrok

# Exponer frontend
ngrok http 5173

# Exponer backend
ngrok http 3001

# Actualizar .env con URLs de ngrok
```

### Usando Vercel Dev
```bash
vercel dev
# Esto crea un URL público temporal
```

---

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"
```bash
# Matar proceso en puerto 5173
lsof -ti:5173 | xargs kill -9

# Matar proceso en puerto 3001
lsof -ti:3001 | xargs kill -9
```

### Error: "Transaction failed"
```bash
# Verificar:
# 1. Tienes ETH en Scroll
# 2. Addresses de contratos correctas
# 3. Gas price no muy bajo
```

### Error: "World ID verification failed"
```bash
# Verificar:
# 1. World ID App ID correcto
# 2. World App actualizada
# 3. Internet estable
```

---

## 📚 Recursos

### Documentación
- [README.md](./README.md) - Documentación principal
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía de deployment
- [BOUNTIES.md](./BOUNTIES.md) - Bounties cumplidos
- [STRUCTURE.md](./STRUCTURE.md) - Estructura del proyecto
- [CHECKLIST.md](./CHECKLIST.md) - Checklist del hackathon

### Tutoriales
- Scroll: https://docs.scroll.io/en/developers/
- Hardhat: https://hardhat.org/tutorial
- Vite: https://vitejs.dev/guide/
- TailwindCSS: https://tailwindcss.com/docs

---

## 🎯 Quick Commands para Demo

### Preparar Demo
```bash
# 1. Iniciar backend
cd backend && npm run dev &

# 2. Iniciar frontend
npm run dev

# 3. Abrir navegador
open http://localhost:5173
```

### Reset Demo
```bash
# Limpiar localStorage
localStorage.clear()

# Recargar página
location.reload()
```

---

**¡Listo para ganar ETHArgentina 2025! 🚀**
