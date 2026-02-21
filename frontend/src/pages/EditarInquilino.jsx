import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Save, ArrowLeft, UserCheck } from 'lucide-react';

export default function EditarInquilino() {
  const { id } = useParams(); // Sacamos el ID de la URL
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    dni: '', nombre: '', apellido: '', telefono: '', email: ''
  });

  // 1. Cargar los datos actuales apenas abre la página
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await api.get(`/inquilinos/${id}`);
        setDatos(res.data);
      } catch (error) {
        alert("Error al cargar datos del inquilino");
        navigate('/');
      }
    };
    obtenerDatos();
  }, [id, navigate]);

  // 2. Función para guardar los cambios
  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/inquilinos/${id}`, datos);
      alert("¡Datos actualizados correctamente!");
      navigate('/'); // Volver a la lista
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition">
        <ArrowLeft size={20}/> Cancelar y volver
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-amber-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <UserCheck className="text-amber-500" /> Editar Inquilino
        </h2>
        
        <form onSubmit={handleActualizar} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">DNI</label>
            <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-400" 
              value={datos.dni} onChange={(e) => setDatos({...datos, dni: e.target.value})} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Nombre</label>
              <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-400" 
                value={datos.nombre} onChange={(e) => setDatos({...datos, nombre: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Apellido</label>
              <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-400" 
                value={datos.apellido} onChange={(e) => setDatos({...datos, apellido: e.target.value})} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Teléfono</label>
            <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-400" 
              value={datos.telefono} onChange={(e) => setDatos({...datos, telefono: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Email</label>
            <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-400" 
              type="email" value={datos.email} onChange={(e) => setDatos({...datos, email: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-amber-500 text-white p-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition shadow-lg flex justify-center items-center gap-2">
            <Save size={24}/> Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}