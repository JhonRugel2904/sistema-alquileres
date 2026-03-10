import { useState, useEffect } from 'react';
import api from '../api/api';
import { Save, DollarSign, Zap, Droplets } from 'lucide-react';

export default function NuevoPago() {
  const [contratos, setContratos] = useState([]);
  const [datos, setDatos] = useState({
    contrato_id: '', mes: new Date().getMonth() + 1, anio: 2026,
    alquiler: 0, internet: 0, luz: 0, agua: 0, otros: 0, total: 0
  });

  useEffect(() => {
    api.get('/contratos').then(res => setContratos(res.data.filter(c => c.activo)));
  }, []);

  const handleContratoChange = (id) => {
    const c = contratos.find(item => item.id === parseInt(id));
    if (c) {
      setDatos({ 
        ...datos, 
        contrato_id: id, 
        alquiler: parseFloat(c.monto_alquiler) || 0, // <--- Sincronizado con el backend
        internet: parseFloat(c.monto_internet_fijo) || 0 
      });
    }
  };

  // Suma automática: Ahora reacciona a cambios en alquiler e internet también
  useEffect(() => {
    const suma = parseFloat(datos.alquiler || 0) + 
                 parseFloat(datos.internet || 0) + 
                 parseFloat(datos.luz || 0) + 
                 parseFloat(datos.agua || 0) + 
                 parseFloat(datos.otros || 0);
    setDatos(prev => ({ ...prev, total: suma.toFixed(2) }));
  }, [datos.alquiler, datos.internet, datos.luz, datos.agua, datos.otros]);

  const guardar = async (e) => {
    e.preventDefault();
    try {
      await api.post('/pagos', datos);
      alert("✅ Pago registrado correctamente");
    } catch (err) { alert("❌ Error al guardar el pago"); }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-gray-800">
        <DollarSign className="text-green-600"/> Registrar Cobro del Mes
      </h2>
      
      <form onSubmit={guardar} className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block font-bold mb-2">Seleccionar Inquilino / Unidad</label>
          <select className="w-full p-4 border rounded-xl bg-gray-50 text-lg font-semibold" required onChange={e => handleContratoChange(e.target.value)}>
            <option value="">-- Seleccione Inquilino --</option>
            {contratos.map(c => <option key={c.id} value={c.id}>{c.inquilino_nombre} ({c.unidad_nombre})</option>)}
          </select>
        </div>

        <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
          <label className="font-bold flex items-center gap-2 mb-2 text-yellow-700"><Zap size={18}/> Monto Luz (S/)</label>
          <input type="number" step="0.01" className="w-full p-3 border rounded-lg" 
            onChange={e => setDatos({...datos, luz: e.target.value})} placeholder="0.00" />
        </div>

        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <label className="font-bold flex items-center gap-2 mb-2 text-blue-700"><Droplets size={18}/> Monto Agua (S/)</label>
          <input type="number" step="0.01" className="w-full p-3 border rounded-lg" 
            onChange={e => setDatos({...datos, agua: e.target.value})} placeholder="0.00" />
        </div>

        <div className="md:col-span-2 p-6 bg-gray-900 rounded-2xl text-white flex justify-between items-center shadow-xl">
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Desglose Mensual</p>
            <p className="text-sm font-medium">Alquiler: S/ {datos.alquiler} | Internet: S/ {datos.internet}</p>
            <h3 className="text-4xl font-black text-green-400 mt-1">Total: S/ {datos.total}</h3>
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl font-black flex items-center gap-2 transition-all transform active:scale-95 shadow-lg">
            <Save /> GUARDAR COBRO
          </button>
        </div>
      </form>
    </div>
  );
}