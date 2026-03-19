import { Eye, CheckCircle, FileText, AlertTriangle, Download, X } from 'lucide-react';

export default function ContractReview({ formData, onAccept, onCancel }) {
  return (
    <div className="card-premium animate-fade-in max-w-2xl mx-auto border-primary-500/50">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <Eye className="w-8 h-8 text-primary-400" />
          <h2 className="text-3xl font-bold">Revisión Legal</h2>
        </div>
        <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-6 h-6 text-white/40" />
        </button>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex gap-4">
        <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
        <p className="text-sm text-yellow-200/80">
          Por favor, revisá cuidadosamente los términos antes de proceder. La firma de esta transacción tiene validez legal de <strong>Firma Electrónica (Ley 25.506)</strong>.
        </p>
      </div>

      {/* Contenedor del "Contrato" */}
      <div className="glass rounded-xl p-6 mb-8 max-h-[400px] overflow-y-auto custom-scrollbar text-white/80 space-y-4">
        <div className="text-center border-b border-white/10 pb-4 mb-4">
          <h3 className="text-xl font-bold text-white">BOLETO DE COMPRAVENTA INMOBILIARIA DIGITAL</h3>
          <p className="text-xs text-white/40">ID de Documento: Hash-SHA256-Pending</p>
        </div>

        <p className="text-sm leading-relaxed">
          En la Ciudad Autónoma de Buenos Aires, a los {new Date().toLocaleDateString('es-AR')}, entre el <strong>Vendedor</strong> identificado con CUIT {formData.sellerCUIT} y el <strong>Comprador</strong> identificado con CUIT {formData.buyerCUIT}, se conviene lo siguiente:
        </p>

        <section className="space-y-2">
          <h4 className="text-white font-semibold">PRIMERA: Objeto</h4>
          <p className="text-sm">
            El Vendedor vende y el Comprador compra un inmueble ubicado en: <br />
            <span className="text-primary-300 font-medium">{formData.propertyAddress}</span>.
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="text-white font-semibold">SEGUNDA: Precio y Pago</h4>
          <p className="text-sm">
            El precio total de la venta se establece en la suma de <strong>{parseFloat(formData.priceUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong>, los cuales serán transferidos mediante un Smart Contract de Escrow Atómico en la red blockchain Scroll.
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="text-white font-semibold">TERCERA: Firma Electrónica</h4>
          <p className="text-sm">
            Las partes acuerdan otorgar plena validez a la firma realizada mediante llaves privadas criptográficas, conforme a lo establecido en la <strong>Ley 25.506 de Firma Digital y el Art. 288 del Código Civil y Comercial de la Nación</strong>.
          </p>
        </section>

        <div className="border-t border-white/10 pt-4 mt-8 italic text-xs text-white/40">
          Este documento es una previsualización generada dinámicamente. Al confirmar, se generará un hash inmutable vinculado a su transacción.
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex gap-3 cursor-pointer group">
          <input type="checkbox" required className="w-5 h-5 mt-1 accent-primary-500" />
          <span className="text-sm text-white/60 group-hover:text-white transition-colors">
            Acepto que mi firma criptográfica en la red Scroll equivale a mi firma electrónica vinculante para este contrato.
          </span>
        </label>

        <div className="flex gap-4">
          <button 
            onClick={onCancel}
            className="btn-secondary flex-1 py-4"
          >
            Corregir Datos
          </button>
          <button 
            onClick={onAccept}
            className="btn-primary flex-1 py-4 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Firmar y Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
