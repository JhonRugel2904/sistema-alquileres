import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { Home, MapPin, Plus, Trash2, Edit, RefreshCw, Info } from 'lucide-react';

export default function Propiedades() {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarPropiedades = async () => {
    try {
      setLoading(true);
      const res = await api.get('/propiedades');
      setPropiedades(res.data);
    } catch (error) {
      console.error("Error al cargar propiedades:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar la propiedad: ${nombre}?`)) {
      try {
        await api.delete(`/propiedades/${id}`);
        setPropiedades(propiedades.filter(p => p.id !== id));
      } catch (error) {
        alert("Error al eliminar la propiedad");
      }
    }
  };

  useEffect(() => { cargarPropiedades(); }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* CABECERA */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Home className="text-blue-600" size={32} /> Inventario de Propiedades
        </h1>
        <div className="flex gap-3">
          <button 
            onClick={cargarPropiedades}
            className="p-2 text-gray-500 hover:text-blue-600 transition"
            title="Refrescar datos"
          >
            <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
          </button>
          <Link 
            to="/nueva-propiedad"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition font-bold shadow-lg active:scale-95"
          >
            <Plus size={20}/> Nueva Propiedad
          </Link>
        </div>
      </div>

      {/* GRID DE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {propiedades.length > 0 ? (
          propiedades.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition flex flex-col h-full">
              
              {/* Parte Superior: Icono y Estado */}
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                  <Home size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  p.estado === 'disponible' 
                    ? 'bg-green-50 text-green-600 border-green-200' 
                    : 'bg-red-50 text-red-600 border-red-200'
                }`}>
                  {p.estado}
                </span>
              </div>
              
              {/* Información Central */}
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight">{p.nombre}</h3>
                <div className="flex items-start gap-2 text-gray-500 text-sm mb-4">
                  <MapPin size={16} className="mt-1 flex-shrink-0" /> 
                  <span>{p.direccion}</span>
                </div>
              </div>

              {/* Parte Inferior: Precio y Acciones */}
              <div className="mt-4 pt-4 border-t border-gray-50">
                <div className="flex gap-2">
                  <Link 
                    to={`/editar-propiedad/${p.id}`}
                    className="flex-1 flex justify-center items-center gap-2 bg-gray-50 hover:bg-amber-100 text-gray-600 hover:text-amber-700 py-2.5 rounded-xl transition font-bold text-xs border border-transparent hover:border-amber-200"
                  >
                    <Edit size={14} /> Editar
                  </Link>
                  <button 
                    onClick={() => handleEliminar(p.id, p.nombre)}
                    className="flex-1 flex justify-center items-center gap-2 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 py-2.5 rounded-xl transition font-bold text-xs border border-transparent hover:border-red-100"
                  >
                    <Trash2 size={14} /> Borrar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium italic">
              {loading ? 'Sincronizando con la base de datos...' : 'No se encontraron propiedades para mostrar.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}