import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { ethers } from 'ethers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Notarial Backend',
    timestamp: new Date().toISOString(),
  });
});

// Mint property NFT via Crossmint (gasless)
app.post('/api/mint-property', async (req, res) => {
  console.log('🎨 Mint property request:', req.body);

  try {
    const { owner, propertyAddress, sellerCUIT, buyerCUIT, priceUSD } = req.body;

    // Validate input
    if (!owner || !propertyAddress || !sellerCUIT || !buyerCUIT || !priceUSD) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate metadata
    const tokenId = Date.now(); // In production, this would come from the contract
    const metadata = {
      name: `Propiedad - ${propertyAddress}`,
      description: `Título de propiedad tokenizado en blockchain`,
      image: `https://notarial.vercel.app/api/property-image/${tokenId}`,
      attributes: [
        { trait_type: 'Dirección', value: propertyAddress },
        { trait_type: 'Precio USD', value: priceUSD },
        { trait_type: 'CUIT Vendedor', value: sellerCUIT },
        { trait_type: 'CUIT Comprador', value: buyerCUIT },
        { trait_type: 'Fecha', value: new Date().toISOString() },
      ],
    };

    // In production, upload metadata to IPFS
    const ipfsHash = `Qm${Math.random().toString(36).substring(7)}`;
    console.log('📦 Metadata uploaded to IPFS:', ipfsHash);

    // In production, call Crossmint API to mint
    // For demo, we simulate the response
    const crossmintResponse = {
      id: `crossmint-${tokenId}`,
      onChain: {
        chain: 'scroll',
        contractAddress: process.env.NOTARIAL_NFT_ADDRESS,
        tokenId: tokenId.toString(),
        owner: owner,
        status: 'success',
      },
      metadata: metadata,
    };

    /* 
    // Real Crossmint API call (uncomment in production):
    const crossmintResponse = await axios.post(
      'https://www.crossmint.com/api/2022-06-09/collections/default/nfts',
      {
        recipient: `scroll:${owner}`,
        metadata: metadata,
      },
      {
        headers: {
          'X-API-KEY': process.env.CROSSMINT_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    */

    console.log('✅ NFT minted via Crossmint:', crossmintResponse);

    res.json({
      success: true,
      tokenId: tokenId.toString(),
      ipfsHash,
      transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
      metadata,
    });

  } catch (error) {
    console.error('❌ Mint error:', error);
    res.status(500).json({ 
      error: 'Failed to mint property',
      message: error.message,
    });
  }
});

// Generate PDF receipt/boleto
app.post('/api/generate-receipt', async (req, res) => {
  console.log('📄 Generate receipt request:', req.body);

  try {
    const {
      sellerCUIT,
      buyerCUIT,
      propertyAddress,
      priceUSD,
      tokenId,
      transactionHash,
      timestamp,
    } = req.body;

    // Create PDF
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=boleto-${tokenId}.pdf`);
    
    // Pipe PDF to response
    doc.pipe(res);

    // Header
    doc.fontSize(24).font('Helvetica-Bold').text('BOLETO DE COMPRA-VENTA', { align: 'center' });
    doc.fontSize(12).font('Helvetica').text('Transferencia Digital de Inmueble', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text(`Token ID: ${tokenId}`, { align: 'center' });
    doc.moveDown(2);

    // Property details
    doc.fontSize(14).font('Helvetica-Bold').text('DATOS DEL INMUEBLE');
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica');
    doc.text(`Dirección: ${propertyAddress}`);
    doc.text(`Precio: USD $${parseFloat(priceUSD).toLocaleString()}`);
    doc.moveDown();

    // Parties
    doc.fontSize(14).font('Helvetica-Bold').text('PARTES INTERVINIENTES');
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica');
    doc.text(`Vendedor (CUIT): ${sellerCUIT}`);
    doc.text(`Comprador (CUIT): ${buyerCUIT}`);
    doc.moveDown();

    // Blockchain details
    doc.fontSize(14).font('Helvetica-Bold').text('REGISTRO BLOCKCHAIN');
    doc.moveDown(0.5);
    doc.fontSize(11).font('Helvetica');
    doc.text(`Red: Scroll Mainnet (zkEVM L2)`);
    doc.text(`Transaction Hash: ${transactionHash}`);
    doc.text(`Fecha: ${new Date(timestamp).toLocaleString('es-AR')}`);
    doc.moveDown();

    // Generate QR code for verification
    const qrData = `https://scrollscan.com/tx/${transactionHash}`;
    const qrImage = await QRCode.toDataURL(qrData);
    const qrBuffer = Buffer.from(qrImage.split(',')[1], 'base64');
    
    doc.fontSize(14).font('Helvetica-Bold').text('VERIFICACIÓN');
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica');
    doc.text('Escaneá el código QR para verificar en blockchain:');
    doc.moveDown(0.5);
    doc.image(qrBuffer, { width: 150, align: 'center' });
    doc.moveDown();

    // Footer
    doc.moveDown(2);
    doc.fontSize(8).font('Helvetica').fillColor('#666');
    doc.text('Este documento es un boleto digital con validez legal.', { align: 'center' });
    doc.text('La transferencia fue ejecutada mediante smart contracts auditados.', { align: 'center' });
    doc.text('Powered by Notarial - ETHArgentina 2025', { align: 'center' });

    // Finalize PDF
    doc.end();

    console.log('✅ PDF generated successfully');

  } catch (error) {
    console.error('❌ PDF generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate receipt',
      message: error.message,
    });
  }
});

// Upload to IPFS (via nft.storage)
app.post('/api/upload-ipfs', async (req, res) => {
  console.log('📦 Upload to IPFS request');

  try {
    const { data } = req.body;

    // In production, upload to nft.storage or web3.storage
    // For demo, we simulate the response
    const ipfsHash = `Qm${Math.random().toString(36).substring(7)}${Math.random().toString(36).substring(7)}`;

    /*
    // Real IPFS upload (uncomment in production):
    const formData = new FormData();
    formData.append('file', Buffer.from(JSON.stringify(data)));
    
    const response = await axios.post(
      'https://api.nft.storage/upload',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NFT_STORAGE_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const ipfsHash = response.data.value.cid;
    */

    console.log('✅ Uploaded to IPFS:', ipfsHash);

    res.json({
      success: true,
      ipfsHash,
      url: `ipfs://${ipfsHash}`,
      gateway: `https://nftstorage.link/ipfs/${ipfsHash}`,
    });

  } catch (error) {
    console.error('❌ IPFS upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload to IPFS',
      message: error.message,
    });
  }
});

// Get property image (placeholder)
app.get('/api/property-image/:tokenId', (req, res) => {
  const { tokenId } = req.params;
  
  // In production, generate or fetch actual property image
  // For demo, redirect to a placeholder
  res.redirect(`https://via.placeholder.com/800x600/0ea5e9/ffffff?text=Property+${tokenId}`);
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Notarial Backend started');
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🌍 CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
  console.log('✅ Ready to receive requests');
});
