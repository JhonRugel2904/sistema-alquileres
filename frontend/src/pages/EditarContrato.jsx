import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Save, ArrowLeft, Edit } from 'lucide-react';

export default function EditarContrato() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    inquilino_id: '', unidad_id: '', monto_internet_fijo: '',
    dia_pago_mensual: '', fecha_inicio: '', fecha_fin: '', activo: true
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await api.get(`/contratos/${id}`);
        // Formatear fecha para el input type="date"
        const data = res.data;
        data.fecha_inicio = data.fecha_inicio.split('T')[0];
        if(data.fecha_fin) data.fecha_fin = data.fecha_fin.split('T')[0];
        setDatos(data);
      } catch (error) {
        alert("Error al cargar contrato");
      }
    };
    cargarDatos();
  }, [id]);

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/contratos/${id}`, datos);
      alert("Contrato actualizado");
      navigate('/contratos');
    } catch (error) {
      alert("Error al guardar cambios");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => navigate('/contratos')} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-blue-600 transition">
        <ArrowLeft size={20}/> Cancelar
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Edit className="text-blue-500" /> Editar Condiciones de Contrato
        </h2>

        <form onSubmit={handleActualizar} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Día de Pago</label>
              <input type="number" className="w-full border p-3 rounded-xl"
                value={datos.dia_pago_mensual} onChange={(e)=>setDatos({...datos, dia_pago_mensual: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Internet (S/)</label>
              <input type="number" className="w-full border p-3 rounded-xl"
                value={datos.monto_internet_fijo} onChange={(e)=>setDatos({...datos, monto_internet_fijo: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Fecha Inicio</label>
            <input type="date" className="w-full border p-3 rounded-xl"
              value={datos.fecha_inicio} onChange={(e)=>setDatos({...datos, fecha_inicio: e.target.value})} />
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
             <input type="checkbox" checked={datos.activo} 
               onChange={(e) => setDatos({...datos, activo: e.target.checked})} />
             <label className="text-sm font-bold text-gray-600">Contrato Activo</label>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}