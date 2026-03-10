import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { FileText, Plus, User, Home, Calendar, RefreshCw, Trash2, Edit } from 'lucide-react';

export default function Contratos() {
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarContratos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/contratos');
      setContratos(res.data);
    } catch (error) {
      console.error("Error al cargar contratos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id, nombreInquilino) => {
    if (window.confirm(`¿Seguro que deseas eliminar el contrato de ${nombreInquilino}? Esto liberará la unidad.`)) {
      try {
        await api.delete(`/contratos/${id}`);
        setContratos(contratos.filter(c => c.id !== id));
        alert("Contrato eliminado y unidad liberada");
      } catch (error) {
        alert("No se pudo eliminar el contrato.");
      }
    }
  };

  useEffect(() => { cargarContratos(); }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FileText className="text-blue-600" size={32} /> Contratos de Alquiler
        </h1>
        <div className="flex gap-3">
          <button onClick={cargarContratos} className="p-2 text-gray-500 hover:text-blue-600 transition">
            <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
          </button>
          <Link 
            to="/nuevo-contrato" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-transform active:scale-95"
          >
            <Plus size={20}/> Nueva Afiliación
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Inquilino</th>
              <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Unidad</th>
              <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">Día Pago</th>
              <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">Internet</th>
              <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="p-5 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {contratos.length > 0 ? (
              contratos.map((c) => (
                <tr key={c.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-5">
                    <div>
                      <p className="font-bold text-gray-800">{c.inquilino_nombre}</p>
                      <p className="text-[10px] text-blue-500 font-bold uppercase tracking-tight">ID: #{c.id}</p>
                    </div>
                  </td>
                  <td className="p-5 text-gray-600">
                    <div className="flex items-center gap-1 font-medium">
                      <Home size={14}/> {c.unidad_nombre}
                    </div>
                    <span className="text-[10px] text-gray-400">{c.edificio_nombre}</span>
                  </td>
                  <td className="p-5 text-center font-bold text-gray-700">Día {c.dia_pago_mensual}</td>
                  <td className="p-5 text-center text-blue-600 font-black">S/ {c.monto_internet_fijo}</td>
                  <td className="p-5">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${c.activo ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {c.activo ? 'ACTIVO' : 'TERMINADO'}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      <Link to={`/editar-contrato/${c.id}`} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => handleEliminar(c.id, c.inquilino_nombre)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-20 text-center text-gray-400 italic bg-gray-50/50">
                  {loading ? 'Cargando contratos...' : 'No hay contratos registrados.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}