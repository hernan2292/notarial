# 🏗️ Workflow: Transferencia Notarial Blockchain (Argentina)

Este documento define el proceso técnico-legal para validar la identidad de las partes, firmar digitalmente el acuerdo y registrarlo on-chain, cumpliendo con el marco de la **Ley 25.506 (Firma Digital)** y el **Código Civil y Comercial**.

## 1. Validación de Identidad (Proof of Personhood)

Para que el contrato tenga validez, debemos asegurar que las wallets pertenecen a personas reales.

1.  **Conexión de Wallet:** El usuario conecta su wallet (Lemon, Metamask, etc.).
2.  **World ID Check:** Se solicita la verificación con World ID para asegurar que es un humano único y evitar bots.
3.  **KYC / CUIT Linking (Opcional):** Se vincula la dirección de la wallet con el CUIT/CUIL a través de una firma de mensaje (off-chain) que valida que el poseedor de la llave privada es quien dice ser.

## 2. Generación del Contrato (Boleto Digital)

No registramos todo el contrato on-chain (por costos y privacidad). Usamos un esquema de **Hash + IPFS**.

1.  **Formulario de Datos:** Se cargan los datos del inmueble, precio, y datos de las partes (CUITs).
2.  **Generación de PDF:** El backend genera un documento PDF (Boleto de Compraventa) con todos los términos legales.
3.  **Hash Único (SHA-256):** Se genera una huella digital (hash) del archivo PDF.

## 3. Firma y Registro On-Chain (Workflow de Firma)

Usamos el contrato `PropertyEscrow` para orquestar la validez.

1.  **Firma del Vendedor:** 
    *   El vendedor sube el PDF (o el hash).
    *   Firma una transacción que hace el `mintProperty` (o lo pone en venta). 
    *   **Implicancia Legal:** Su firma con la llave privada sobre el hash del documento equivale a una firma electrónica según la Ley 25.506.
2.  **Firma del Comprador:**
    *   El comprador revisa el PDF (validando que el hash coincida).
    *   Ejecuta `buyerApprove` enviando los fondos (USDC).
    *   Al firmar la transacción, está aceptando los términos del PDF vinculado al NFT.
3.  **Swap Atómico:** El contrato `PropertyEscrow` ejecuta el intercambio. Solo si AMBAS partes firmaron, la propiedad cambia de dueño y los fondos se liberan.

## 4. Registro y Verificación

1.  **On-Chain:** El NFT ahora tiene un nuevo dueño. El evento de transferencia queda grabado en la red Scroll con el timestamp oficial.
2.  **PDF con QR:** El PDF final se actualiza con un código QR que apunta a la transacción en Scrollscan, sirviendo como "Certificado de Dominio Digital".

---

## ⚖️ Consideraciones Legales en Argentina

*   **Firma Electrónica vs. Digital:** Al usar wallets, estamos técnicamente en el terreno de la **Firma Electrónica**. Para que sea **Firma Digital** (con inversión de carga de prueba), se requeriría un certificador licenciado (como el de la ONTI), pero para un **Boleto de Compraventa**, la firma electrónica es legalmente vinculante entre partes (Art. 288 CCCN).
*   **Escrituración:** Este sistema reemplaza eficientemente al **Boleto de Compraventa**. Para la **Escritura Traslativa de Dominio** final, todavía se requiere la intervención de un escribano para la inscripción en el Registro de la Propiedad Inmueble (RPI), pero nuestro sistema puede actuar como el registro primario y veraz que el escribano simplemente "protocoliza".

---

## 🚀 Próximos Pasos en el Frontend

1.  **Pantalla de Revisión:** Antes de pagar, el comprador debe "Previsualizar el Contrato".
2.  **Checkbox Legal:** "Acepto que la firma de esta transacción equivale a mi firma electrónica en los términos de la Ley 25.506".
3.  **Visualizador de Documentos:** Un componente para ver el PDF generado por el backend.
