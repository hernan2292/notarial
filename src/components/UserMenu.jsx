import { useState, useEffect, useRef } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { User, LogOut, ChevronDown, ShieldCheck, History, Settings } from 'lucide-react';

export default function UserMenu({ worldIdVerified }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isConnected) {
    return <ConnectButton label="Conectar" />;
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 glass-strong px-4 py-2 rounded-xl hover:bg-white/15 transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div className="hidden sm:block text-left mr-1">
          <div className="text-[10px] text-white/50 leading-none mb-1">
            {worldIdVerified ? '✅ VERIFICADO' : 'Wallet'}
          </div>
          <div className="text-sm font-medium leading-none">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 glass-strong rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-fade-in">
          <div className="p-4 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                <ShieldCheck className={`w-6 h-6 ${worldIdVerified ? 'text-success' : 'text-white/20'}`} />
              </div>
              <div>
                <div className="text-sm font-bold">Mi Perfil Digital</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider">
                  {worldIdVerified ? 'Humano Verificado' : 'Pendiente Verificación'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-2">
            <MenuLink icon={<History className="w-4 h-4" />} label="Mis Transferencias" />
            <MenuLink icon={<Settings className="w-4 h-4" />} label="Configuración" />
          </div>

          <div className="p-2 bg-white/5">
            <button 
              onClick={() => disconnect()}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-error hover:bg-error/10 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Desconectar Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({ icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
    >
      <span className="text-primary-400">{icon}</span>
      {label}
    </button>
  );
}
