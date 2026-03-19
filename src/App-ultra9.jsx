import { useState } from 'react';
import { useAccount } from 'wagmi';
import Hero from './components/Hero';
import PropertyForm from './components/PropertyForm';
import TokenizationDashboard from './components/TokenizationDashboard';
import TransactionHistory from './components/TransactionHistory';
import Footer from './components/Footer';
import { isTelegramMiniApp } from './config';

function App() {
  const { isConnected } = useAccount();
  const [worldIdVerified, setWorldIdVerified] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState('home'); // 'home' | 'transfer' | 'assets'
  const isTelegram = isTelegramMiniApp();

  return (
    <div className="min-h-screen">
      {/* Background gradient animation */}
      <div className="fixed inset-0 gradient-bg opacity-50 pointer-events-none" />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Navigation / Header */}
        {isConnected && (
          <nav className="max-w-6xl mx-auto px-4 py-6 flex justify-center">
            <div className="glass-strong p-1 rounded-2xl flex gap-1">
              <NavButton active={view === 'home'} onClick={() => setView('home')} label="Inicio" />
              <NavButton active={view === 'assets'} onClick={() => setView('assets')} label="Mis Activos" />
              <NavButton active={view === 'transfer'} onClick={() => setView('transfer')} label="Nueva Transferencia" />
            </div>
          </nav>
        )}

        {/* Home View */}
        {view === 'home' && (
          <Hero 
            worldIdVerified={worldIdVerified}
            setWorldIdVerified={setWorldIdVerified}
            showForm={showForm}
            setShowForm={() => setView('transfer')}
          />
        )}

        {/* Assets View (Tokenization Dashboard) */}
        {view === 'assets' && isConnected && (
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <TokenizationDashboard />
            </div>
          </section>
        )}

        {/* Property Transfer Form */}
        {view === 'transfer' && isConnected && worldIdVerified && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <PropertyForm />
            </div>
          </section>
        )}

        {/* Transaction History */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <TransactionHistory />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              ¿Por qué <span className="text-gradient">Notarial</span>?
            </h2>
            <p className="text-center text-white/60 mb-12 text-lg">
              La forma más rápida, segura y económica de transferir propiedades
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon="⚡"
                title="20 minutos"
                description="Transferencia completa en menos de 20 minutos vs. 30-60 días tradicional"
              />
              <FeatureCard
                icon="💰"
                title="<1% de costo"
                description="Ahorrá hasta 99% en costos notariales y de gestoría"
              />
              <FeatureCard
                icon="🔒"
                title="100% seguro"
                description="Smart contracts auditados + escrow atómico + verificación World ID"
              />
              <FeatureCard
                icon="🌍"
                title="Sin fronteras"
                description="Pagá desde cualquier blockchain con Wormhole bridge"
              />
              <FeatureCard
                icon="📱"
                title="Mobile-first"
                description="Funciona en Telegram, Lemon Wallet y cualquier navegador"
              />
              <FeatureCard
                icon="📄"
                title="Legal"
                description="Boleto digital con validez legal + registro en blockchain"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="card-premium text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">
                Impacto <span className="text-gradient">Real</span>
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                <StatCard number="$0" label="Gas fees pagados" />
                <StatCard number="<20min" label="Tiempo promedio" />
                <StatCard number="99%" label="Ahorro en costos" />
                <StatCard number="100%" label="Transparencia" />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="card group hover:scale-105">
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/60">{description}</p>
    </div>
  );
}

// Stat Card Component
function StatCard({ number, label }) {
  return (
    <div className="group">
      <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2 group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      <div className="text-white/60">{label}</div>
    </div>
  );
}

function NavButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
        active 
          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
}

export default App;
