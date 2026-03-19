import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import { Building2, Shield, Zap } from 'lucide-react';
import { config } from '../config';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';
import UserMenu from './UserMenu';

export default function Hero({ worldIdVerified, setWorldIdVerified, showForm, setShowForm }) {
  const { isConnected } = useAccount();

  const handleWorldIdSuccess = (result) => {
    console.log('✅ World ID verification success:', result);
    setWorldIdVerified(true);
    toast.success('¡Identidad verificada con World ID!');
    
    // Auto-show form after verification
    setTimeout(() => {
      setShowForm(true);
    }, 1000);
  };

  const handleWorldIdError = (error) => {
    console.error('❌ World ID verification error:', error);
    toast.error('Error en verificación World ID');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Top Navbar Simulation */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Building2 className="w-8 h-8 text-primary-400" />
          <span className="text-xl font-bold font-display tracking-tight">NOTARIAL</span>
        </div>
        <UserMenu worldIdVerified={worldIdVerified} />
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center mt-12">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-500 blur-3xl opacity-30 animate-pulse-slow"></div>
            <Building2 className="w-24 h-24 text-primary-400 relative z-10" strokeWidth={1.5} />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Transferí tu inmueble
          <br />
          <span className="text-gradient">sin escribano</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto animate-slide-up">
          100% legal, en menos de 20 minutos y con menos del 1% de costo
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <TrustBadge icon={<Shield className="w-5 h-5" />} text="Scroll zkEVM" />
          <TrustBadge icon={<Zap className="w-5 h-5" />} text="Sin gas fees" />
          <TrustBadge icon="🌍" text="World ID" />
          <TrustBadge icon="🔗" text="Wormhole" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          {!isConnected ? (
            <div className="bg-primary-500 hover:bg-primary-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-primary-500/20 transform hover:scale-105 active:scale-95 cursor-pointer">
              {/* Note: This is a placeholder since the actual button is in the Nav now */}
              Explorar Propiedades
            </div>
          ) : !worldIdVerified ? (
            <IDKitWidget
              app_id={config.worldIdAppId}
              action={config.worldIdAction}
              verification_level={VerificationLevel.Orb}
              onSuccess={handleWorldIdSuccess}
              onError={handleWorldIdError}
            >
              {({ open }) => (
                <button onClick={open} className="btn-accent flex items-center gap-2 text-lg py-4 px-8">
                  <span className="text-2xl">🌍</span>
                  Verificar con World ID
                </button>
              )}
            </IDKitWidget>
          ) : (
            <div className="flex items-center gap-3 glass-strong px-8 py-4 rounded-2xl border-primary-500/30 border">
              <span className="text-2xl">✅</span>
              <div className="text-left">
                <div className="text-xs text-white/40 uppercase font-bold tracking-widest">Estado</div>
                <div className="font-semibold text-lg text-success">Humano Verificado</div>
              </div>
            </div>
          )}

          {isConnected && worldIdVerified && !showForm && (
            <button onClick={() => setShowForm(true)} className="btn-primary text-lg py-4 px-8">
              Comenzar Transferencia →
            </button>
          )}
        </div>

        {/* Demo Video or Screenshot placeholder */}
        <div className="max-w-4xl mx-auto">
          <div className="card-premium overflow-hidden group">
            <div className="aspect-video bg-gradient-to-br from-primary-900/20 to-accent-900/20 flex items-center justify-center">
              <div className="text-center">
                <Building2 className="w-20 h-20 text-white/20 mx-auto mb-4 group-hover:text-white/40 transition-colors duration-300" />
                <p className="text-white/40 group-hover:text-white/60 transition-colors duration-300">
                  Demo en vivo - ETHArgentina 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Trust Badge Component
function TrustBadge({ icon, text }) {
  return (
    <div className="badge-primary flex items-center gap-2 px-4 py-2">
      {typeof icon === 'string' ? <span className="text-lg">{icon}</span> : icon}
      <span>{text}</span>
    </div>
  );
}
