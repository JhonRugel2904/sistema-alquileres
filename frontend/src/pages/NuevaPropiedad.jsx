import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Save, ArrowLeft, Home } from 'lucide-react';

export default function NuevaPropiedad() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    nombre: '', direccion: ''
  });

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await api.post('/propiedades', datos);
      alert("¡Propiedad registrada!");
      navigate('/propiedades');
    } catch (error) {
      alert("Error al registrar propiedad");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/propiedades')} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition">
        <ArrowLeft size={20}/> Volver al inventario
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-50">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Home className="text-blue-600" /> Registrar Nueva Unidad
        </h2>
        
        <form onSubmit={handleGuardar} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Nombre (Ej: Depto 101)</label>
            <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400" 
              value={datos.nombre} onChange={(e) => setDatos({...datos, nombre: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Dirección Completa</label>
            <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400" 
              value={datos.direccion} onChange={(e) => setDatos({...datos, direccion: e.target.value})} required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg flex justify-center items-center gap-2">
            <Save size={24}/> Guardar Propiedad
          </button>
        </form>
      </div>
    </div>
  );
}