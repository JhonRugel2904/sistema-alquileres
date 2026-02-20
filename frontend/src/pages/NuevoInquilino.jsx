import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Save, ArrowLeft } from 'lucide-react';

export default function NuevoInquilino() {
  const navigate = useNavigate();
  const [nuevo, setNuevo] = useState({
    dni: '', nombre: '', apellido: '', telefono: '', email: ''
  });

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await api.post('/inquilinos', nuevo);
      alert("¡Registrado con éxito!");
      navigate('/'); // Te lleva de regreso a la tabla
    } catch (error) {
      alert("Error al guardar");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition">
        <ArrowLeft size={20}/> Volver a la lista
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuevo Registro de Inquilino</h2>
      
      <form onSubmit={handleGuardar} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">DNI</label>
          <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={nuevo.dni} onChange={(e) => setNuevo({...nuevo, dni: e.target.value})} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Nombres</label>
            <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={nuevo.nombre} onChange={(e) => setNuevo({...nuevo, nombre: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Apellidos</label>
            <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={nuevo.apellido} onChange={(e) => setNuevo({...nuevo, apellido: e.target.value})} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Email</label>
            <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={nuevo.email} onChange={(e) => setNuevo({...nuevo, email: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Apellidos</label>
            <input className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={nuevo.telefono} onChange={(e) => setNuevo({...nuevo, telefono: e.target.value})} required />
          </div>
        </div>
        {/* ... añade el resto de campos igual ... */}
        <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg flex justify-center items-center gap-2">
          <Save size={24}/> Guardar Inquilino
        </button>
      </form>
    </div>
  );
}