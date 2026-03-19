# 🗄️ Notarial - Modelo de Datos

**Proyecto:** Notarial - Transferencia de Inmuebles sin Escribano  
**Fecha:** Noviembre 2025  
**Versión:** 1.0

---

## 📊 ARQUITECTURA DE DATOS

### Capas de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                     │
│                    (Frontend - React)                        │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE APLICACIÓN                       │
│                  (Backend - Node.js/Express)                │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌──────────────────┬──────────────────┬──────────────────────┐
│   BLOCKCHAIN     │    DATABASE      │       STORAGE        │
│   (Scroll)       │  (PostgreSQL)    │       (IPFS)         │
└──────────────────┴──────────────────┴──────────────────────┘
```

---

## 1️⃣ ENTIDADES PRINCIPALES

### 1.1 User (Usuario)

**Descripción:** Representa a un usuario del sistema (comprador, vendedor, o ambos)

**Atributos:**
```typescript
interface User {
  // Identificadores
  id: string;                    // UUID
  walletAddress: string;         // Ethereum address (0x...)
  worldIdHash: string;           // World ID verification hash
  
  // Información Personal (encriptada)
  cuit: string;                  // CUIT argentino
  email: string;                 // Email
  phone: string;                 // Teléfono
  
  // Metadata
  createdAt: Date;               // Fecha de registro
  updatedAt: Date;               // Última actualización
  lastLoginAt: Date;             // Último login
  
  // Verificación
  isVerified: boolean;           // Verificado con World ID
  kycStatus: 'pending' | 'approved' | 'rejected';
  
  // Estadísticas
  transactionsCount: number;     // Total de transacciones
  totalVolume: number;           // Volumen total en USD
  
  // Relaciones
  properties: Property[];        // Propiedades que posee
  transactions: Transaction[];   // Transacciones realizadas
}
```

**Índices:**
- Primary: `id`
- Unique: `walletAddress`, `worldIdHash`, `cuit`
- Index: `email`, `createdAt`

**Validaciones:**
- `walletAddress`: Debe ser una dirección Ethereum válida
- `cuit`: Formato XX-XXXXXXXX-X
- `email`: Formato de email válido
- `worldIdHash`: Debe ser único y verificado

---

### 1.2 Property (Propiedad)

**Descripción:** Representa un inmueble tokenizado como NFT

**Atributos:**
```typescript
interface Property {
  // Identificadores
  id: string;                    // UUID (off-chain)
  tokenId: number;               // Token ID del NFT (on-chain)
  contractAddress: string;       // Address del contrato NFT
  
  // Información del Inmueble
  address: string;               // Dirección física
  city: string;                  // Ciudad
  province: string;              // Provincia
  postalCode: string;            // Código postal
  country: string;               // País (default: Argentina)
  
  // Datos Catastrales
  cadastralCode: string;         // Nomenclatura catastral
  parcelNumber: string;          // Número de parcela
  surfaceArea: number;           // Superficie en m²
  builtArea: number;             // Superficie cubierta en m²
  
  // Características
  propertyType: 'apartment' | 'house' | 'land' | 'commercial';
  rooms: number;                 // Cantidad de ambientes
  bathrooms: number;             // Cantidad de baños
  parking: number;               // Cantidad de cocheras
  
  // Financiero
  priceUSD: number;              // Precio en USD
  priceARS: number;              // Precio en ARS (referencia)
  lastSalePrice: number;         // Último precio de venta
  
  // Documentación
  ipfsHash: string;              // Hash IPFS de documentos
  metadataURI: string;           // URI de metadata del NFT
  images: string[];              // Array de URLs de imágenes
  documents: Document[];         // Documentos asociados
  
  // Propiedad
  currentOwner: string;          // Wallet address del dueño actual
  previousOwners: string[];      // Historial de dueños
  
  // Estado
  status: 'active' | 'in_transfer' | 'transferred' | 'locked';
  isTokenized: boolean;          // Si ya fue tokenizado
  
  // Metadata
  createdAt: Date;               // Fecha de tokenización
  updatedAt: Date;               // Última actualización
  mintedAt: Date;                // Fecha de mint del NFT
  
  // Relaciones
  owner: User;                   // Dueño actual
  transfers: Transfer[];         // Transferencias
  transactions: Transaction[];   // Transacciones
}
```

**Índices:**
- Primary: `id`
- Unique: `tokenId`, `cadastralCode`
- Index: `currentOwner`, `status`, `city`, `propertyType`

**Validaciones:**
- `tokenId`: Debe existir en blockchain
- `cadastralCode`: Formato válido de nomenclatura catastral
- `priceUSD`: Mayor a 0
- `currentOwner`: Debe ser una dirección Ethereum válida

---

### 1.3 Transaction (Transacción)

**Descripción:** Representa una transacción de transferencia de propiedad

**Atributos:**
```typescript
interface Transaction {
  // Identificadores
  id: string;                    // UUID
  transferId: number;            // ID del transfer en smart contract
  txHash: string;                // Transaction hash en blockchain
  
  // Partes
  sellerId: string;              // ID del vendedor
  buyerId: string;               // ID del comprador
  propertyId: string;            // ID de la propiedad
  
  // Financiero
  priceUSD: number;              // Precio acordado en USD
  feeAmount: number;             // Fee de Notarial
  totalAmount: number;           // Total (precio + fee)
  
  // Blockchain
  blockNumber: number;           // Número de bloque
  blockTimestamp: Date;          // Timestamp del bloque
  gasUsed: number;               // Gas usado
  gasPaidBy: 'seller' | 'buyer' | 'platform';
  
  // Estado
  status: 'created' | 'seller_approved' | 'buyer_approved' | 'completed' | 'cancelled';
  sellerApproved: boolean;       // Si el vendedor aprobó
  buyerApproved: boolean;        // Si el comprador aprobó
  
  // Documentación
  receiptPDF: string;            // URL del PDF del boleto
  receiptIPFS: string;           // Hash IPFS del boleto
  
  // Metadata
  createdAt: Date;               // Fecha de creación
  completedAt: Date;             // Fecha de completado
  cancelledAt: Date;             // Fecha de cancelación (si aplica)
  
  // Relaciones
  seller: User;                  // Vendedor
  buyer: User;                   // Comprador
  property: Property;            // Propiedad
  events: TransactionEvent[];    // Eventos de la transacción
}
```

**Índices:**
- Primary: `id`
- Unique: `txHash`, `transferId`
- Index: `sellerId`, `buyerId`, `propertyId`, `status`, `createdAt`

**Validaciones:**
- `priceUSD`: Mayor a 0
- `txHash`: Formato de transaction hash válido
- `status`: Debe seguir el flujo correcto

---

### 1.4 TransactionEvent (Evento de Transacción)

**Descripción:** Representa eventos que ocurren durante una transacción

**Atributos:**
```typescript
interface TransactionEvent {
  // Identificadores
  id: string;                    // UUID
  transactionId: string;         // ID de la transacción
  
  // Evento
  eventType: 'created' | 'seller_approved' | 'buyer_approved' | 
             'nft_transferred' | 'payment_received' | 'completed' | 'cancelled';
  eventData: JSON;               // Datos adicionales del evento
  
  // Blockchain
  txHash: string;                // Transaction hash (si aplica)
  blockNumber: number;           // Número de bloque
  
  // Metadata
  timestamp: Date;               // Timestamp del evento
  triggeredBy: string;           // Wallet que triggereó el evento
  
  // Relaciones
  transaction: Transaction;      // Transacción asociada
}
```

**Índices:**
- Primary: `id`
- Index: `transactionId`, `eventType`, `timestamp`

---

### 1.5 Document (Documento)

**Descripción:** Representa documentos asociados a una propiedad

**Atributos:**
```typescript
interface Document {
  // Identificadores
  id: string;                    // UUID
  propertyId: string;            // ID de la propiedad
  
  // Documento
  documentType: 'title' | 'cadastral_plan' | 'tax_certificate' | 
                'deed' | 'inspection_report' | 'other';
  fileName: string;              // Nombre del archivo
  fileSize: number;              // Tamaño en bytes
  mimeType: string;              // Tipo MIME
  
  // Storage
  ipfsHash: string;              // Hash IPFS del documento
  url: string;                   // URL de acceso
  
  // Metadata
  uploadedAt: Date;              // Fecha de subida
  uploadedBy: string;            // Wallet que subió
  
  // Relaciones
  property: Property;            // Propiedad asociada
}
```

**Índices:**
- Primary: `id`
- Unique: `ipfsHash`
- Index: `propertyId`, `documentType`

---

## 2️⃣ DATOS ON-CHAIN (Blockchain)

### 2.1 NotarialNFT Contract

**Estructura de Datos:**
```solidity
struct PropertyMetadata {
    string propertyAddress;      // Dirección del inmueble
    string cadastralCode;        // Nomenclatura catastral
    uint256 priceUSD;            // Precio en USD (6 decimals)
    string sellerCUIT;           // CUIT del vendedor
    string buyerCUIT;            // CUIT del comprador
    uint256 mintedAt;            // Timestamp de mint
    string ipfsHash;             // Hash IPFS de documentos
}

mapping(uint256 => PropertyMetadata) public properties;
mapping(string => bool) public isPropertyTokenized;
```

**Eventos:**
```solidity
event PropertyMinted(
    uint256 indexed tokenId,
    address indexed owner,
    string propertyAddress,
    uint256 priceUSD
);

event PropertyTransferred(
    uint256 indexed tokenId,
    address indexed from,
    address indexed to,
    uint256 priceUSD,
    uint256 timestamp
);
```

---

### 2.2 PropertyEscrow Contract

**Estructura de Datos:**
```solidity
struct Transfer {
    uint256 tokenId;             // ID del NFT
    address seller;              // Address del vendedor
    address buyer;               // Address del comprador
    uint256 priceUSD;            // Precio en USDC (6 decimals)
    bool sellerApproved;         // Si vendedor aprobó
    bool buyerApproved;          // Si comprador aprobó
    bool completed;              // Si se completó
    uint256 createdAt;           // Timestamp de creación
}

mapping(uint256 => Transfer) public transfers;
uint256 public transferCounter;
```

**Eventos:**
```solidity
event TransferCreated(
    uint256 indexed transferId,
    uint256 indexed tokenId,
    address indexed seller,
    address buyer,
    uint256 priceUSD
);

event SellerApproved(uint256 indexed transferId);
event BuyerApproved(uint256 indexed transferId);

event TransferCompleted(
    uint256 indexed transferId,
    uint256 indexed tokenId,
    address seller,
    address buyer,
    uint256 priceUSD
);

event TransferCancelled(uint256 indexed transferId);
```

---

## 3️⃣ RELACIONES ENTRE ENTIDADES

### Diagrama ER (Entity-Relationship)

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│     USER     │────────▶│   PROPERTY   │◀────────│ TRANSACTION  │
│              │ 1     * │              │ 1     * │              │
│ - id         │         │ - id         │         │ - id         │
│ - wallet     │         │ - tokenId    │         │ - txHash     │
│ - worldId    │         │ - address    │         │ - priceUSD   │
│ - cuit       │         │ - priceUSD   │         │ - status     │
└──────────────┘         └──────────────┘         └──────────────┘
       │                        │                        │
       │                        │                        │
       │                        │ 1                      │ 1
       │                        │                        │
       │                        ▼ *                      ▼ *
       │                 ┌──────────────┐         ┌──────────────┐
       │                 │   DOCUMENT   │         │    EVENT     │
       │                 │              │         │              │
       │                 │ - id         │         │ - id         │
       │                 │ - ipfsHash   │         │ - eventType  │
       │                 │ - fileType   │         │ - timestamp  │
       │                 └──────────────┘         └──────────────┘
       │
       │ *
       ▼ 1
┌──────────────┐
│ VERIFICATION │
│              │
│ - id         │
│ - worldId    │
│ - verified   │
└──────────────┘
```

### Relaciones Detalladas

**User ↔ Property (1:N)**
- Un usuario puede poseer múltiples propiedades
- Una propiedad pertenece a un solo usuario (en un momento dado)
- Relación: `User.properties` ↔ `Property.owner`

**User ↔ Transaction (1:N)**
- Un usuario puede participar en múltiples transacciones
- Una transacción involucra dos usuarios (comprador y vendedor)
- Relación: `User.transactions` ↔ `Transaction.seller/buyer`

**Property ↔ Transaction (1:N)**
- Una propiedad puede tener múltiples transacciones (historial)
- Una transacción involucra una sola propiedad
- Relación: `Property.transactions` ↔ `Transaction.property`

**Property ↔ Document (1:N)**
- Una propiedad puede tener múltiples documentos
- Un documento pertenece a una sola propiedad
- Relación: `Property.documents` ↔ `Document.property`

**Transaction ↔ TransactionEvent (1:N)**
- Una transacción puede tener múltiples eventos
- Un evento pertenece a una sola transacción
- Relación: `Transaction.events` ↔ `TransactionEvent.transaction`

---

## 4️⃣ FLUJO DE DATOS

### 4.1 Flujo de Tokenización

```
1. Usuario conecta wallet
   ↓
2. Verifica identidad con World ID
   ↓
3. Completa formulario de propiedad
   ↓
4. Backend valida datos
   ↓
5. Backend sube documentos a IPFS
   ↓
6. Backend crea metadata JSON
   ↓
7. Backend llama a Crossmint API
   ↓
8. Crossmint mintea NFT (gasless)
   ↓
9. NFT se asigna a wallet del usuario
   ↓
10. Backend guarda datos en DB
    ↓
11. Frontend muestra confirmación
```

### 4.2 Flujo de Transferencia

```
1. Vendedor crea transferencia
   ↓
2. Smart contract crea Transfer struct
   ↓
3. Backend escucha evento TransferCreated
   ↓
4. Backend crea Transaction en DB
   ↓
5. Vendedor aprueba NFT al escrow
   ↓
6. Vendedor llama sellerApprove()
   ↓
7. NFT se transfiere al escrow
   ↓
8. Comprador aprueba USDC al escrow
   ↓
9. Comprador llama buyerApprove()
   ↓
10. USDC se transfiere al escrow
    ↓
11. Smart contract ejecuta swap atómico
    ↓
12. NFT va al comprador, USDC al vendedor
    ↓
13. Backend escucha evento TransferCompleted
    ↓
14. Backend actualiza Transaction en DB
    ↓
15. Backend genera PDF del boleto
    ↓
16. Frontend descarga PDF
```

---

## 5️⃣ ALMACENAMIENTO DE DATOS

### 5.1 Base de Datos (PostgreSQL)

**Tablas:**
```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    world_id_hash VARCHAR(66) UNIQUE NOT NULL,
    cuit VARCHAR(13) UNIQUE NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    kyc_status VARCHAR(20) DEFAULT 'pending',
    transactions_count INTEGER DEFAULT 0,
    total_volume DECIMAL(18, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login_at TIMESTAMP
);

-- Properties
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_id INTEGER UNIQUE NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    country VARCHAR(100) DEFAULT 'Argentina',
    cadastral_code VARCHAR(50) UNIQUE NOT NULL,
    parcel_number VARCHAR(50),
    surface_area DECIMAL(10, 2),
    built_area DECIMAL(10, 2),
    property_type VARCHAR(20),
    rooms INTEGER,
    bathrooms INTEGER,
    parking INTEGER,
    price_usd DECIMAL(18, 2) NOT NULL,
    price_ars DECIMAL(18, 2),
    last_sale_price DECIMAL(18, 2),
    ipfs_hash VARCHAR(100),
    metadata_uri TEXT,
    current_owner VARCHAR(42) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    is_tokenized BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    minted_at TIMESTAMP,
    FOREIGN KEY (current_owner) REFERENCES users(wallet_address)
);

-- Transactions
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transfer_id INTEGER UNIQUE NOT NULL,
    tx_hash VARCHAR(66) UNIQUE NOT NULL,
    seller_id UUID NOT NULL,
    buyer_id UUID NOT NULL,
    property_id UUID NOT NULL,
    price_usd DECIMAL(18, 2) NOT NULL,
    fee_amount DECIMAL(18, 2) NOT NULL,
    total_amount DECIMAL(18, 2) NOT NULL,
    block_number INTEGER,
    block_timestamp TIMESTAMP,
    gas_used INTEGER,
    gas_paid_by VARCHAR(20),
    status VARCHAR(20) DEFAULT 'created',
    seller_approved BOOLEAN DEFAULT FALSE,
    buyer_approved BOOLEAN DEFAULT FALSE,
    receipt_pdf TEXT,
    receipt_ipfs VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id),
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Transaction Events
CREATE TABLE transaction_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    tx_hash VARCHAR(66),
    block_number INTEGER,
    timestamp TIMESTAMP DEFAULT NOW(),
    triggered_by VARCHAR(42),
    FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);

-- Documents
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    ipfs_hash VARCHAR(100) UNIQUE NOT NULL,
    url TEXT,
    uploaded_at TIMESTAMP DEFAULT NOW(),
    uploaded_by VARCHAR(42),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);
```

### 5.2 Blockchain (Scroll)

**Datos almacenados:**
- NFTs de propiedades (ERC721)
- Transfers en escrow
- Eventos de transacciones
- Ownership history

**Ventajas:**
- Inmutabilidad
- Transparencia
- Descentralización
- Proof of ownership

### 5.3 IPFS (Descentralizado)

**Datos almacenados:**
- Documentos de propiedades (PDFs, imágenes)
- Metadata de NFTs (JSON)
- Boletos de compra-venta
- Planos catastrales

**Estructura de metadata:**
```json
{
  "name": "Propiedad - Av. Libertador 5432, CABA",
  "description": "Título de propiedad tokenizado en blockchain",
  "image": "ipfs://QmXXX/image.jpg",
  "external_url": "https://notarial.app/property/123",
  "attributes": [
    {
      "trait_type": "Dirección",
      "value": "Av. Libertador 5432, CABA"
    },
    {
      "trait_type": "Nomenclatura Catastral",
      "value": "14-28-001-0045-0000-3"
    },
    {
      "trait_type": "Superficie",
      "value": "85 m²"
    },
    {
      "trait_type": "Precio USD",
      "value": "250000"
    },
    {
      "trait_type": "Fecha de Tokenización",
      "value": "2025-11-20"
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "ipfs://QmXXX/title.pdf",
        "type": "application/pdf",
        "name": "Título de Propiedad"
      },
      {
        "uri": "ipfs://QmYYY/plan.pdf",
        "type": "application/pdf",
        "name": "Plano Catastral"
      }
    ]
  }
}
```

---

## 6️⃣ SEGURIDAD Y PRIVACIDAD

### Datos Sensibles

**Encriptación:**
- CUIT: Encriptado con AES-256
- Email: Encriptado con AES-256
- Phone: Encriptado con AES-256
- Documentos personales: Encriptados antes de IPFS

**Acceso:**
- Solo el propietario puede ver sus datos sensibles
- Backend tiene clave de encriptación en HSM
- Logs no contienen datos sensibles

### GDPR/Privacidad

**Datos personales:**
- Consentimiento explícito al registrarse
- Derecho a ser olvidado (soft delete)
- Portabilidad de datos
- Transparencia en uso de datos

---

## 7️⃣ BACKUP Y RECUPERACIÓN

### Estrategia de Backup

**Base de Datos:**
- Backup diario automático
- Retención: 30 días
- Backup incremental cada 6 horas
- Replicación en múltiples regiones

**Blockchain:**
- No requiere backup (descentralizado)
- Múltiples nodos mantienen copia

**IPFS:**
- Pinning en múltiples nodos
- Backup en Filecoin (permanente)
- Replicación geográfica

---

## 📊 RESUMEN

### Entidades Principales
- **Users:** 5 campos clave
- **Properties:** 25+ campos
- **Transactions:** 20+ campos
- **Documents:** 10+ campos
- **Events:** 8+ campos

### Almacenamiento
- **PostgreSQL:** Datos relacionales y queries complejos
- **Blockchain:** Ownership y transferencias
- **IPFS:** Documentos y metadata

### Escalabilidad
- Índices optimizados
- Particionamiento por fecha
- Caché con Redis
- CDN para assets

---

*Documento creado: Noviembre 2025*  
*Proyecto: Notarial - ETHArgentina 2025*  
*Versión: 1.0*
