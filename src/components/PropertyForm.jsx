import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'ethers';
import { FileText, Upload, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { config } from '../config';

export default function PropertyForm() {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    sellerCUIT: '',
    buyerCUIT: '',
    propertyAddress: '',
    priceUSD: '',
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Minting, 3: Transfer, 4: Success

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 Form submitted:', formData);
    
    // Validation
    if (!formData.sellerCUIT || !formData.buyerCUIT || !formData.propertyAddress || !formData.priceUSD) {
      toast.error('Por favor completá todos los campos');
      return;
    }

    setLoading(true);
    
    try {
      // Step 1: Mint NFT via Crossmint (gasless)
      setStep(2);
      toast.loading('Tokenizando propiedad...', { id: 'minting' });
      
      const mintResponse = await fetch(`${config.backendUrl}/api/mint-property`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: address,
          propertyAddress: formData.propertyAddress,
          sellerCUIT: formData.sellerCUIT,
          buyerCUIT: formData.buyerCUIT,
          priceUSD: formData.priceUSD,
        }),
      });

      if (!mintResponse.ok) {
        throw new Error('Error al tokenizar propiedad');
      }

      const mintData = await mintResponse.json();
      console.log('✅ NFT minted:', mintData);
      toast.success('¡Propiedad tokenizada!', { id: 'minting' });

      // Step 2: Initiate transfer
      setStep(3);
      toast.loading('Preparando transferencia...', { id: 'transfer' });

      // In a real implementation, this would call the smart contract
      // For demo purposes, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('¡Transferencia completada!', { id: 'transfer' });
      setStep(4);

      // Generate PDF receipt
      const pdfResponse = await fetch(`${config.backendUrl}/api/generate-receipt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tokenId: mintData.tokenId,
          transactionHash: mintData.transactionHash,
          timestamp: new Date().toISOString(),
        }),
      });

      if (pdfResponse.ok) {
        const blob = await pdfResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `boleto-${mintData.tokenId}.pdf`;
        a.click();
        toast.success('Boleto descargado');
      }

    } catch (error) {
      console.error('❌ Error:', error);
      toast.error(error.message || 'Error en la transferencia');
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  if (step === 4) {
    return <SuccessScreen formData={formData} onReset={() => { setStep(1); setFormData({ sellerCUIT: '', buyerCUIT: '', propertyAddress: '', priceUSD: '' }); }} />;
  }

  return (
    <div className="card-premium">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8 text-primary-400" />
        <h2 className="text-3xl font-bold">Transferencia de Propiedad</h2>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <StepIndicator number={1} label="Datos" active={step === 1} completed={step > 1} />
          <div className="flex-1 h-1 bg-white/10 mx-2">
            <div className={`h-full bg-primary-500 transition-all duration-500 ${step > 1 ? 'w-full' : 'w-0'}`} />
          </div>
          <StepIndicator number={2} label="Tokenizar" active={step === 2} completed={step > 2} />
          <div className="flex-1 h-1 bg-white/10 mx-2">
            <div className={`h-full bg-primary-500 transition-all duration-500 ${step > 2 ? 'w-full' : 'w-0'}`} />
          </div>
          <StepIndicator number={3} label="Transferir" active={step === 3} completed={step > 3} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              CUIT del Vendedor
            </label>
            <input
              type="text"
              name="sellerCUIT"
              value={formData.sellerCUIT}
              onChange={handleInputChange}
              placeholder="20-12345678-9"
              className="input"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              CUIT del Comprador
            </label>
            <input
              type="text"
              name="buyerCUIT"
              value={formData.buyerCUIT}
              onChange={handleInputChange}
              placeholder="20-98765432-1"
              className="input"
              disabled={loading}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Dirección del Inmueble
          </label>
          <input
            type="text"
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleInputChange}
            placeholder="Av. Corrientes 1234, CABA"
            className="input"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Precio en USD
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">$</span>
            <input
              type="number"
              name="priceUSD"
              value={formData.priceUSD}
              onChange={handleInputChange}
              placeholder="150000"
              className="input pl-8"
              disabled={loading}
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="glass rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Costo tradicional (3-5%)</span>
            <span className="text-white/80">${formData.priceUSD ? (parseFloat(formData.priceUSD) * 0.04).toLocaleString() : '0'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Costo Notarial (<1%)</span>
            <span className="text-success font-semibold">${formData.priceUSD ? (parseFloat(formData.priceUSD) * 0.005).toLocaleString() : '0'}</span>
          </div>
          <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
            <span>Ahorro</span>
            <span className="text-gradient-primary">${formData.priceUSD ? (parseFloat(formData.priceUSD) * 0.035).toLocaleString() : '0'}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {step === 2 ? 'Tokenizando...' : 'Transfiriendo...'}
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Tokenizar y Transferir
            </>
          )}
        </button>

        <p className="text-center text-sm text-white/40">
          ⚡ Sin gas fees gracias a Crossmint • 🔒 Escrow atómico seguro
        </p>
      </form>
    </div>
  );
}

// Step Indicator Component
function StepIndicator({ number, label, active, completed }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
        completed ? 'bg-success text-white' :
        active ? 'bg-primary-500 text-white glow-primary' :
        'bg-white/10 text-white/40'
      }`}>
        {completed ? '✓' : number}
      </div>
      <div className={`text-xs mt-1 ${active ? 'text-white' : 'text-white/40'}`}>
        {label}
      </div>
    </div>
  );
}

// Success Screen Component
function SuccessScreen({ formData, onReset }) {
  return (
    <div className="card-premium text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-5xl">✅</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">¡Transferencia Exitosa!</h2>
        <p className="text-white/60">La propiedad ha sido transferida correctamente</p>
      </div>

      <div className="glass rounded-xl p-6 mb-6 text-left space-y-3">
        <div className="flex justify-between">
          <span className="text-white/60">Propiedad</span>
          <span className="font-semibold">{formData.propertyAddress}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Precio</span>
          <span className="font-semibold">${parseFloat(formData.priceUSD).toLocaleString()} USD</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Tiempo</span>
          <span className="font-semibold text-success">~15 minutos</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onReset} className="btn-secondary flex-1">
          Nueva Transferencia
        </button>
        <button className="btn-primary flex-1">
          Ver en Scrollscan
        </button>
      </div>
    </div>
  );
}
