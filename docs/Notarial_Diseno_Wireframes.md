# 🎨 Notarial - Diseño (Wireframes y Mockups)

**Proyecto:** Notarial - Transferencia de Inmuebles sin Escribano  
**Fecha:** Noviembre 2025  
**Versión:** 1.0

---

## 📱 WIREFRAMES GENERADOS

He generado 3 wireframes/mockups profesionales para el proyecto:

### 1. Wireframe Principal - Interfaz Completa
**Archivo:** `notarial_wireframe_main.png`

**Descripción:**
Mockup de alta fidelidad mostrando la interfaz completa de la aplicación:
- Hero section con branding
- Botones de conexión de wallet y verificación World ID
- Formulario de transferencia con glassmorphism
- Historial de transacciones
- Diseño mobile-first con tema oscuro

**Elementos clave:**
- Logo "NOTARIAL" con icono de edificio
- Gradiente azul a púrpura
- Trust badges (Scroll, World ID, Crossmint, Wormhole)
- Formulario con 4 campos principales
- CTA prominente "Tokenizar y Transferir"

---

### 2. Diagrama de Flujo de Usuario
**Archivo:** `notarial_flow_diagram.png`

**Descripción:**
Infografía mostrando el flujo de 3 pasos para transferir una propiedad:

**Paso 1: Conectar Wallet**
- Integración con RainbowKit
- Soporte para MetaMask, Rainbow, Coinbase
- Conexión en 1 click

**Paso 2: Verificar Identidad**
- World ID con Zero-Knowledge Proof
- Escaneo de QR code
- Verificación instantánea

**Paso 3: Transferir Propiedad**
- Formulario simple
- Escrow atómico
- Swap NFT ↔ USDC

**Comparación:**
- ⚡ 20 minutos vs 60 días
- 💰 <1% vs 4% de costo
- 🔒 100% seguro

---

### 3. Diagrama de Arquitectura Técnica
**Archivo:** `notarial_architecture_diagram.png`

**Descripción:**
Diagrama técnico mostrando la arquitectura en capas:

**Capa de Frontend:**
- React + Vite
- TailwindCSS
- Mobile-first design

**Capa de Integración:**
- RainbowKit (wallets)
- World ID (identity)
- Crossmint (gasless minting)
- Wormhole (cross-chain)

**Capa de Backend:**
- Node.js/Express API
- PostgreSQL database
- IPFS (nft.storage)

**Capa de Blockchain:**
- Scroll Mainnet (zkEVM)
- NotarialNFT (ERC721)
- PropertyEscrow (Escrow)
- USDC payments

---

## 🎨 DISEÑO Y ESTILO

### Paleta de Colores

**Colores Principales:**
- **Primary Blue:** #0ea5e9 (Confianza, tecnología)
- **Accent Purple:** #d946ef (Innovación, premium)
- **Success Green:** #10b981 (Confirmación)
- **Warning Orange:** #f59e0b (Atención)
- **Error Red:** #ef4444 (Alerta)

**Backgrounds:**
- **Dark:** #0f172a (Slate 950)
- **Mid:** #1e293b (Slate 800)
- **Light:** #334155 (Slate 700)

**Gradientes:**
- **Hero:** Linear gradient from #0ea5e9 to #d946ef
- **Cards:** Radial gradient with opacity
- **Buttons:** Linear gradient on hover

### Tipografía

**Headings:**
- Font: Outfit (Google Fonts)
- Weights: 600, 700, 800, 900
- Uso: Títulos, CTAs, números grandes

**Body:**
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600
- Uso: Texto general, formularios

**Monospace:**
- Font: JetBrains Mono
- Uso: Addresses, hashes, código

### Efectos Visuales

**Glassmorphism:**
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

**Shadows:**
```css
/* Soft shadow */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

/* Glow effect */
box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);

/* Premium shadow */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
```

**Animations:**
- Fade in: 0.5s ease-in-out
- Slide up: 0.5s ease-out
- Hover scale: 1.05 (0.3s)
- Pulse: 3s infinite

---

## 📐 COMPONENTES UI

### 1. Hero Section

**Elementos:**
- Logo centrado con animación de entrada
- Heading principal (H1) con gradient text
- Subheading descriptivo
- Trust badges en fila
- 2 CTAs (primary + secondary)
- Scroll indicator animado

**Dimensiones:**
- Height: 100vh (mobile), 90vh (desktop)
- Max-width: 1200px
- Padding: 2rem (mobile), 4rem (desktop)

---

### 2. Wallet Connection Button

**Estados:**
- **Disconnected:** "Conectar Wallet" (blue gradient)
- **Connecting:** "Conectando..." (loading spinner)
- **Connected:** Address truncado + avatar

**Interacción:**
- Hover: Scale 1.05 + shadow increase
- Click: Abre RainbowKit modal
- Connected: Muestra dropdown con opciones

---

### 3. World ID Verification

**Componente:**
- Button con icono de globo
- QR code modal
- Success state con checkmark
- Error handling

**Flow:**
1. Click button
2. Modal con QR code
3. Escanear con World App
4. Verificación en 2-3 segundos
5. Success animation

---

### 4. Property Transfer Form

**Layout:**
```
┌─────────────────────────────────────┐
│  Transferencia de Propiedad         │
├─────────────────────────────────────┤
│  [Progress: 1 → 2 → 3]              │
├─────────────────────────────────────┤
│  CUIT Vendedor:  [____________]     │
│  CUIT Comprador: [____________]     │
│  Dirección:      [____________]     │
│  Precio USD:     [$___________]     │
├─────────────────────────────────────┤
│  Costo tradicional:    $10,000      │
│  Costo Notarial:       $1,250       │
│  Ahorro:               $8,750 ✨    │
├─────────────────────────────────────┤
│  [  Tokenizar y Transferir  ]       │
└─────────────────────────────────────┘
```

**Validación:**
- Real-time validation
- Error messages inline
- Success states con checkmarks
- Loading states con spinners

---

### 5. Transaction History Card

**Layout:**
```
┌─────────────────────────────────────┐
│  🏠 Av. Libertador 5432, CABA       │
│  Hace 2 horas                       │
├─────────────────────────────────────┤
│  De:   0x1234...5678                │
│  Para: 0x8765...4321                │
├─────────────────────────────────────┤
│  $250,000 USD                       │
│  ✓ Confirmado                       │
│  [Ver en Scrollscan →]              │
└─────────────────────────────────────┘
```

**Estados:**
- Pending: Spinner animado
- Confirmed: Checkmark verde
- Failed: X rojo con retry

---

## 📱 RESPONSIVE DESIGN

### Breakpoints

```css
/* Mobile first */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Mobile (< 640px)
- Single column layout
- Stack all elements vertically
- Full-width buttons
- Larger touch targets (min 44px)
- Simplified navigation

### Tablet (640px - 1024px)
- 2 column grid for cards
- Sidebar navigation
- Larger form fields
- More spacing

### Desktop (> 1024px)
- 3 column grid
- Fixed sidebar
- Hover effects
- Keyboard shortcuts

---

## 🎯 INTERACCIONES

### Micro-animaciones

**Button Hover:**
```css
transition: all 0.3s ease;
transform: scale(1.05);
box-shadow: 0 10px 20px rgba(0,0,0,0.2);
```

**Card Hover:**
```css
transition: all 0.3s ease;
background: rgba(255,255,255,0.1);
border-color: rgba(14,165,233,0.3);
```

**Input Focus:**
```css
transition: all 0.2s ease;
border-color: #0ea5e9;
box-shadow: 0 0 0 3px rgba(14,165,233,0.1);
```

### Loading States

**Spinner:**
```html
<div class="spinner"></div>
```

**Skeleton:**
```html
<div class="skeleton-card animate-pulse">
  <div class="h-4 bg-white/10 rounded w-3/4"></div>
  <div class="h-3 bg-white/10 rounded w-1/2"></div>
</div>
```

**Progress Bar:**
```html
<div class="progress-bar">
  <div class="progress-fill" style="width: 60%"></div>
</div>
```

---

## 🔍 ACCESIBILIDAD

### WCAG 2.1 Level AA

**Contraste:**
- Text on background: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

**Keyboard Navigation:**
- Tab order lógico
- Focus visible en todos los elementos
- Skip links para navegación
- Escape para cerrar modals

**Screen Readers:**
- Semantic HTML (header, nav, main, footer)
- ARIA labels en iconos
- Alt text en imágenes
- Live regions para updates

**Motion:**
- Respeta prefers-reduced-motion
- Animaciones opcionales
- No autoplay videos

---

## 📊 MÉTRICAS DE DISEÑO

### Performance

**Lighthouse Score Target:**
- Performance: 90+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### UX Metrics

**Time to Interactive:**
- Target: < 3 seconds
- Critical path optimized
- Lazy loading de imágenes

**Task Completion:**
- Connect wallet: < 10 seconds
- Verify World ID: < 30 seconds
- Complete transfer: < 2 minutes

---

## 🎨 ASSETS

### Iconos
- Lucide React (https://lucide.dev)
- Tamaño: 20px, 24px, 32px
- Stroke width: 1.5px

### Imágenes
- Logo: SVG (escalable)
- Property images: WebP (optimizado)
- Avatars: 40x40px, 80x80px

### Ilustraciones
- Hero: Generada con IA
- Empty states: Minimalistas
- Error states: Amigables

---

## 📝 DESIGN SYSTEM

### Spacing Scale
```
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
6: 24px
8: 32px
12: 48px
16: 64px
20: 80px
```

### Border Radius
```
sm: 4px
md: 8px
lg: 12px
xl: 16px
2xl: 24px
full: 9999px
```

### Font Sizes
```
xs: 12px
sm: 14px
base: 16px
lg: 18px
xl: 20px
2xl: 24px
3xl: 30px
4xl: 36px
5xl: 48px
```

---

## 🔗 LINKS A WIREFRAMES

### Archivos Generados
1. ✅ `notarial_wireframe_main.png` - Interfaz completa
2. ✅ `notarial_flow_diagram.png` - Flujo de usuario
3. ✅ `notarial_architecture_diagram.png` - Arquitectura técnica

### Figma (Opcional)
Para crear wireframes interactivos:
1. Ir a https://figma.com
2. Crear nuevo proyecto "Notarial"
3. Importar los PNG generados
4. Agregar interactividad
5. Compartir link público

**Link de ejemplo:**
`https://figma.com/file/xxx/Notarial-Wireframes`

---

## 📋 PRÓXIMOS PASOS

### Para el Hackathon
- [x] Wireframes principales generados
- [ ] Convertir a PDF
- [ ] Agregar anotaciones
- [ ] Crear versión interactiva (opcional)

### Post-Hackathon
- [ ] Diseño de alta fidelidad en Figma
- [ ] Prototipo interactivo
- [ ] User testing
- [ ] Iteración basada en feedback

---

**Conclusión:**

Los wireframes y mockups generados muestran una interfaz moderna, premium y fácil de usar que refleja la innovación tecnológica de Notarial. El diseño prioriza la simplicidad (3 clicks) mientras mantiene una estética profesional que genera confianza.

---

*Documento creado: Noviembre 2025*  
*Proyecto: Notarial - ETHArgentina 2025*  
*Versión: 1.0*
