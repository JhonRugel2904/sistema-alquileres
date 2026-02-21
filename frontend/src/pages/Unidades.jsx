import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { LayoutGrid, Plus, Home, RefreshCw, Trash2, Edit } from 'lucide-react';

export default function Unidades() {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarUnidades = async () => {
    try {
      setLoading(true);
      const res = await api.get('/unidades');
      setUnidades(res.data);
    } catch (error) {
      console.error("Error al cargar unidades:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- NUEVA FUNCIÓN PARA BORRAR ---
  const handleEliminar = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar la unidad "${nombre}"?`)) {
      try {
        await api.delete(`/unidades/${id}`);
        // Filtramos el estado para que la tarjeta desaparezca sin recargar
        setUnidades(unidades.filter(u => u.id !== id));
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar la unidad. Verifica si tiene contratos activos.");
      }
    }
  };

  useEffect(() => { cargarUnidades(); }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <LayoutGrid className="text-blue-600" size={32} /> Gestión de Unidades
        </h1>
        <div className="flex gap-3">
          <button onClick={cargarUnidades} className="p-2 text-gray-500 hover:text-blue-600 transition">
            <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
          </button>
          <Link 
            to="/nueva-unidad" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-transform active:scale-95"
          >
            <Plus size={20}/> Nueva Unidad
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unidades.length > 0 ? (
          unidades.map((u) => (
            <div key={u.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between h-full hover:shadow-xl transition-shadow">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md border ${
                    u.tipo === 'departamento' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                  }`}>
                    {u.tipo}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    u.estado === 'disponible' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {u.estado}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{u.nombre_nro}</h3>
                <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                  <Home size={14}/> {u.edificio_nombre || 'Edificio desconocido'}
                </p>
              </div>
              
              <div className="border-t pt-4 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Precio Base</p>
                  <span className="text-xl font-black text-blue-600">S/ {u.precio_base}</span>
                </div>
                
                {/* BOTONES DE ACCIÓN */}
                <div className="flex gap-1">
                  <Link 
                    to={`/editar-unidad/${u.id}`}
                    className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit size={20} />
                  </Link>
                  <button 
                    onClick={() => handleEliminar(u.id, u.nombre_nro)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Borrar"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400 italic bg-gray-50 rounded-3xl border-2 border-dashed">
            {loading ? 'Cargando unidades...' : 'No se encontraron unidades en la base de datos.'}
          </div>
        )}
      </div>
    </div>
  );
}