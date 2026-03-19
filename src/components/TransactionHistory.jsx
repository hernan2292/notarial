import { useState, useEffect } from 'react';
import { Clock, ExternalLink, TrendingUp } from 'lucide-react';
import { config } from '../config';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      // In production, this would fetch from the backend/blockchain
      // For demo, we'll use mock data
      const mockTransactions = [
        {
          id: '1',
          propertyAddress: 'Av. Libertador 5432, CABA',
          price: 250000,
          from: '0x1234...5678',
          to: '0x8765...4321',
          timestamp: Date.now() - 3600000,
          txHash: '0xabcd...efgh',
        },
        {
          id: '2',
          propertyAddress: 'Calle Corrientes 1234, CABA',
          price: 180000,
          from: '0x2345...6789',
          to: '0x9876...5432',
          timestamp: Date.now() - 7200000,
          txHash: '0xbcde...fghi',
        },
        {
          id: '3',
          propertyAddress: 'Av. Santa Fe 2345, CABA',
          price: 320000,
          from: '0x3456...7890',
          to: '0x0987...6543',
          timestamp: Date.now() - 10800000,
          txHash: '0xcdef...ghij',
        },
      ];

      setTimeout(() => {
        setTransactions(mockTransactions);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Hace menos de 1 hora';
    if (hours === 1) return 'Hace 1 hora';
    return `Hace ${hours} horas`;
  };

  return (
    <div className="card-premium">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-primary-400" />
          <h2 className="text-3xl font-bold">Transferencias Recientes</h2>
        </div>
        <div className="badge-success flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span>En vivo</span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-white/10 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          <Clock className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p>No hay transferencias aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <TransactionCard key={tx.id} transaction={tx} formatTime={formatTime} />
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button className="btn-secondary">
          Ver todas las transferencias
        </button>
      </div>
    </div>
  );
}

function TransactionCard({ transaction, formatTime }) {
  return (
    <div className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary-400 transition-colors">
            {transaction.propertyAddress}
          </h3>
          <p className="text-white/60 text-sm">{formatTime(transaction.timestamp)}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gradient-primary">
            ${transaction.price.toLocaleString()}
          </div>
          <div className="text-xs text-white/40">USD</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-white/40 mb-1">De</div>
          <div className="font-mono text-sm glass px-3 py-1 rounded-lg inline-block">
            {transaction.from}
          </div>
        </div>
        <div>
          <div className="text-xs text-white/40 mb-1">Para</div>
          <div className="font-mono text-sm glass px-3 py-1 rounded-lg inline-block">
            {transaction.to}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
          Confirmado
        </div>
        <a
          href={`https://scrollscan.com/tx/${transaction.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors"
        >
          Ver en Scrollscan
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
