import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Save, ArrowLeft, LayoutGrid } from 'lucide-react';

export default function NuevaUnidad() {
  const navigate = useNavigate();
  const [propiedades, setPropiedades] = useState([]);
  const [datos, setDatos] = useState({
    propiedad_id: '',
    nombre_nro: '',
    tipo: 'cuarto',
    precio_base: '',
    paga_servicios_extra: false,
    estado: 'disponible'
  });

  // Cargar edificios para el Select
  useEffect(() => {
    const cargarPropiedades = async () => {
      try {
        const res = await api.get('/propiedades');
        setPropiedades(res.data);
      } catch (error) {
        console.error("Error al cargar edificios", error);
      }
    };
    cargarPropiedades();
  }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      // Enviamos todos los datos que pide tu tabla 'unidades'
      await api.post('/unidades', datos);
      alert("¡Unidad registrada con éxito!");
      navigate('/unidades'); // Regresamos a la lista
    } catch (error) {
      console.error(error);
      alert("Error al guardar: Revisa que el edificio esté seleccionado.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/unidades')} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-blue-600 transition">
        <ArrowLeft size={20}/> Volver a la lista
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <LayoutGrid className="text-blue-600" size={28} /> Registrar Unidad
        </h2>

        <form onSubmit={handleGuardar} className="space-y-5">
          {/* Selección de Edificio */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Edificio / Propiedad</label>
            <select 
              className="w-full border p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              value={datos.propiedad_id}
              onChange={(e) => setDatos({...datos, propiedad_id: e.target.value})}
              required
            >
              <option value="">-- Seleccione un edificio --</option>
              {propiedades.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nro / Nombre</label>
              <input className="w-full border p-4 rounded-2xl" placeholder="Ej: 204" 
                value={datos.nombre_nro} onChange={(e) => setDatos({...datos, nombre_nro: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tipo</label>
              <select className="w-full border p-4 rounded-2xl" value={datos.tipo} onChange={(e) => setDatos({...datos, tipo: e.target.value})}>
                <option value="cuarto">Cuarto</option>
                <option value="departamento">Departamento</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Precio Mensual (S/)</label>
              <input type="number" className="w-full border p-4 rounded-2xl" 
                value={datos.precio_base} onChange={(e) => setDatos({...datos, precio_base: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Estado Inicial</label>
              <select className="w-full border p-4 rounded-2xl" value={datos.estado} onChange={(e) => setDatos({...datos, estado: e.target.value})}>
                <option value="disponible">Disponible</option>
                <option value="ocupado">Ocupado</option>
                <option value="mantenimiento">Mantenimiento</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <input 
              type="checkbox" 
              className="w-5 h-5 cursor-pointer accent-blue-600"
              checked={datos.paga_servicios_extra}
              onChange={(e) => setDatos({...datos, paga_servicios_extra: e.target.checked})}
            />
            <label className="text-sm font-bold text-blue-800 cursor-pointer">¿Paga servicios aparte (Luz/Agua)?</label>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg flex justify-center items-center gap-2 active:scale-95">
            <Save size={24}/> Registrar Unidad
          </button>
        </form>
      </div>
    </div>
  );
}