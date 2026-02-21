import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Save, ArrowLeft, Edit3 } from 'lucide-react';

export default function EditarUnidad() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propiedades, setPropiedades] = useState([]);
  const [datos, setDatos] = useState({
    propiedad_id: '',
    nombre_nro: '',
    tipo: 'cuarto',
    precio_base: '',
    paga_servicios_extra: false,
    estado: ''
  });

  useEffect(() => {
    const inicializar = async () => {
      try {
        const [resProp, resUnidad] = await Promise.all([
          api.get('/propiedades'),
          api.get(`/unidades/${id}`)
        ]);
        setPropiedades(resProp.data);
        setDatos(resUnidad.data);
      } catch (error) {
        alert("Error al cargar datos");
        navigate('/unidades');
      }
    };
    inicializar();
  }, [id, navigate]);

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/unidades/${id}`, datos);
      alert("¡Unidad actualizada correctamente!");
      navigate('/unidades');
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/unidades')} className="flex items-center gap-2 text-gray-500 hover:text-amber-600 mb-6 transition">
        <ArrowLeft size={20}/> Cancelar y volver
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-amber-50">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Edit3 className="text-amber-500" /> Editar Unidad
        </h2>
        
        <form onSubmit={handleActualizar} className="space-y-4">
          {/* Edificio */}
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Edificio / Propiedad</label>
            <select 
              className="w-full border p-3 rounded-xl bg-gray-50"
              value={datos.propiedad_id} 
              onChange={(e) => setDatos({...datos, propiedad_id: e.target.value})} 
              required
            >
              <option value="">Seleccione edificio</option>
              {propiedades.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Nombre o Número */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Nro / Nombre</label>
              <input 
                className="w-full border p-3 rounded-xl"
                value={datos.nombre_nro} 
                onChange={(e) => setDatos({...datos, nombre_nro: e.target.value})} 
                required 
              />
            </div>
            {/* Tipo */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Tipo</label>
              <select 
                className="w-full border p-3 rounded-xl"
                value={datos.tipo} 
                onChange={(e) => setDatos({...datos, tipo: e.target.value})}
              >
                <option value="cuarto">Cuarto</option>
                <option value="departamento">Departamento</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Precio */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Precio Base (S/)</label>
              <input 
                type="number" 
                className="w-full border p-3 rounded-xl"
                value={datos.precio_base} 
                onChange={(e) => setDatos({...datos, precio_base: e.target.value})} 
                required 
              />
            </div>
            {/* Estado */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Estado</label>
              <select 
                className="w-full border p-3 rounded-xl"
                value={datos.estado} 
                onChange={(e) => setDatos({...datos, estado: e.target.value})}
              >
                <option value="disponible">Disponible</option>
                <option value="ocupado">Ocupado</option>
                <option value="mantenimiento">Mantenimiento</option>
              </select>
            </div>
          </div>

          {/* Checkbox Servicios */}
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
            <input 
              type="checkbox" 
              className="w-5 h-5 cursor-pointer"
              checked={datos.paga_servicios_extra}
              onChange={(e) => setDatos({...datos, paga_servicios_extra: e.target.checked})}
            />
            <label className="text-sm font-medium text-amber-800">¿Paga servicios aparte (Luz/Agua)?</label>
          </div>

          <button type="submit" className="w-full bg-amber-500 text-white p-4 rounded-xl font-bold hover:bg-amber-600 transition shadow-lg flex justify-center items-center gap-2">
            <Save size={20}/> Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}