import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
// Importaciones limpias sin duplicados
import { Users, UserPlus, RefreshCw, Trash2, Edit } from 'lucide-react';

export default function Inquilinos() {
  const [inquilinos, setInquilinos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarInquilinos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/inquilinos');
      setInquilinos(res.data);
    } catch (error) {
      console.error("Error al cargar inquilinos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar con confirmación
  const handleEliminar = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
      try {
        await api.delete(`/inquilinos/${id}`);
        // Filtramos el estado local para que desaparezca al instante
        setInquilinos(inquilinos.filter(i => i.id !== id));
        alert("Inquilino eliminado");
      } catch (error) {
        alert("Error al eliminar el inquilino");
      }
    }
  };

  useEffect(() => {
    cargarInquilinos();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Users className="text-blue-600" size={32} /> 
          Inquilinos
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={cargarInquilinos}
            className="p-2 text-gray-500 hover:text-blue-600 transition"
          >
            <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
          </button>
          
          <Link 
            to="/nuevo-inquilino"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition font-bold shadow-md"
          >
            <UserPlus size={20}/> Nuevo Inquilino
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">DNI</th>
              <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">Inquilino</th>
              <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest">Datos de Contacto</th>
              <th className="p-5 font-bold text-gray-500 text-xs uppercase tracking-widest text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {inquilinos.length > 0 ? (
              inquilinos.map((i) => (
                <tr key={i.id} className="hover:bg-blue-50/30 transition duration-150">
                  <td className="p-5 font-mono text-sm text-blue-600 font-bold">{i.dni}</td>
                  <td className="p-5 text-gray-800 font-semibold text-lg">{i.nombre} {i.apellido}</td>
                  <td className="p-5">
                    <div className="text-gray-700 font-medium">{i.telefono || 'Sin teléfono'}</div>
                    <div className="text-gray-400 text-sm italic">{i.email || 'Sin correo registrado'}</div>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      {/* Botón Editar - Luego crearemos esta ruta */}
                      <Link 
                        to={`/editar-inquilino/${i.id}`}
                        className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition"
                      >
                        <Edit size={20} />
                      </Link>
                      
                      {/* Botón Eliminar */}
                      <button 
                        onClick={() => handleEliminar(i.id, i.nombre)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-20 text-center text-gray-400 italic">
                  {loading ? 'Cargando registros...' : 'No se encontraron inquilinos en la base de datos.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}