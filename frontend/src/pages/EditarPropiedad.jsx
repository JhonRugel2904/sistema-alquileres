import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Save, ArrowLeft, Edit3 } from 'lucide-react';

export default function EditarPropiedad() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    nombre: '', direccion: ''
  });

  useEffect(() => {
    const cargarPropiedad = async () => {
      try {
        const res = await api.get(`/propiedades/${id}`);
        setDatos(res.data);
      } catch (error) {
        alert("Error al cargar la propiedad");
        navigate('/propiedades');
      }
    };
    cargarPropiedad();
  }, [id, navigate]);

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/propiedades/${id}`, datos);
      alert("Propiedad actualizada");
      navigate('/propiedades');
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/propiedades')} className="flex items-center gap-2 text-gray-500 hover:text-amber-600 mb-6 transition">
        <ArrowLeft size={20}/> Cancelar
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-amber-50">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Edit3 className="text-amber-500" /> Editar Detalles de Propiedad
        </h2>
        
        <form onSubmit={handleActualizar} className="space-y-4">
          {/* ... mismos campos que NuevaPropiedad ... */}
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Nombre</label>
            <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-400" 
              value={datos.nombre} onChange={(e) => setDatos({...datos, nombre: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Dirección</label>
            <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-400" 
              value={datos.direccion} onChange={(e) => setDatos({...datos, direccion: e.target.value})} required />
          </div>
          <button type="submit" className="w-full bg-amber-500 text-white p-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition shadow-lg">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}