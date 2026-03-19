import { useState } from 'react';
import { LayoutGrid, PieChart, Plus, Share2, Wallet } from 'lucide-react';

export default function TokenizationDashboard() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      address: 'Av. Del Libertador 1500, Vicente López',
      totalFractions: 1000,
      myFractions: 1000,
      status: 'Propietario Total',
      valuation: '500,000 USD'
    }
  ]);

  return (
    <div className="card-premium animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <PieChart className="w-8 h-8 text-primary-400" />
          <h2 className="text-3xl font-bold">Mis Activos Tokenizados</h2>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tokenizar Nueva Propiedad
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {properties.map(prop => (
          <div key={prop.id} className="glass rounded-2xl p-6 border-white/10 hover:border-primary-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold group-hover:text-primary-400 transition-colors">{prop.address}</h3>
                <p className="text-sm text-white/40">Valuación estimada: {prop.valuation}</p>
              </div>
              <span className="badge-primary">{prop.status}</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/60">Distribución de Propiedad</span>
                  <span className="text-white/80">{(prop.myFractions / prop.totalFractions * 100)}% poseído</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500" 
                    style={{ width: `${(prop.myFractions / prop.totalFractions * 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="btn-secondary flex items-center justify-center gap-2 py-2 text-sm">
                  <Share2 className="w-4 h-4" />
                  Dividir / Fraccionar
                </button>
                <button className="glass-strong hover:bg-white/20 rounded-xl flex items-center justify-center gap-2 py-2 text-sm transition-all">
                  <Wallet className="w-4 h-4" />
                  Transferir Fracción
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl flex gap-4 items-center">
        <LayoutGrid className="w-6 h-6 text-primary-400" />
        <p className="text-sm text-white/60">
          <strong>Régimen CNV RG 1060:</strong> Tus activos digitales tienen equivalencia funcional con títulos tradicionales bajo el nuevo marco regulatorio argentino.
        </p>
      </div>
    </div>
  );
}
