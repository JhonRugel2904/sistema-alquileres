import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Save, ArrowLeft, FileText, User, LayoutGrid, Calendar } from 'lucide-react';

export default function NuevoContrato() {
  const navigate = useNavigate();
  const [inquilinos, setInquilinos] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [datos, setDatos] = useState({
    inquilino_id: '',
    unidad_id: '',
    monto_alquiler: 0, // <--- Agregamos esto para capturar el precio
    monto_internet_fijo: 0,
    dia_pago_mensual: 1,
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_fin: ''
  });

  useEffect(() => {
    const cargarInfo = async () => {
      try {
        const [resInq, resUni] = await Promise.all([
          api.get('/inquilinos'),
          api.get('/unidades')
        ]);
        setInquilinos(resInq.data);
        setUnidades(resUni.data.filter(u => u.estado === 'disponible'));
      } catch (error) {
        console.error("Error al cargar datos iniciales");
      }
    };
    cargarInfo();
  }, []);

  // Función para manejar el cambio de unidad y capturar su precio automáticamente
  const handleUnidadChange = (e) => {
    const idSeleccionado = e.target.value;
    const unidad = unidades.find(u => u.id === parseInt(idSeleccionado));
    
    setDatos({
      ...datos,
      unidad_id: idSeleccionado,
      // Si existe la unidad, tomamos su precio_base, si no, 0
      monto_alquiler: unidad ? unidad.precio_base : 0 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos los datos, incluyendo ahora el monto_alquiler
      await api.post('/contratos', datos);
      alert("¡Contrato creado y unidad ocupada!");
      navigate('/contratos');
    } catch (error) {
      alert("Error al crear contrato. Verifica los datos.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button onClick={() => navigate('/contratos')} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-blue-600">
        <ArrowLeft size={20}/> Volver a contratos
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-blue-50">
        <h2 className="text-2xl font-black mb-8 text-gray-800 flex items-center gap-3">
          <FileText className="text-blue-600" /> Nueva Afiliación de Alquiler
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Selección de Inquilino */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
                <User size={16}/> Inquilino
              </label>
              <select className="w-full border p-4 rounded-2xl bg-gray-50" required
                value={datos.inquilino_id} onChange={(e) => setDatos({...datos, inquilino_id: e.target.value})}>
                <option value="">Seleccione el inquilino</option>
                {inquilinos.map(i => <option key={i.id} value={i.id}>{i.nombre} {i.apellido} ({i.dni})</option>)}
              </select>
            </div>

            {/* Selección de Unidad */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
                <LayoutGrid size={16}/> Unidad Disponible
              </label>
              <select className="w-full border p-4 rounded-2xl bg-gray-50" required
                value={datos.unidad_id} onChange={handleUnidadChange}>
                <option value="">Seleccione habitación/depa</option>
                {unidades.map(u => <option key={u.id} value={u.id}>{u.nombre_nro} - {u.edificio_nombre} (S/ {u.precio_base})</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Monto Alquiler (Solo lectura para confirmar) */}
             <div>
              <label className="block text-sm font-bold text-gray-600 mb-2 text-green-600">Alquiler Pactado (S/)</label>
              <input type="number" className="w-full border p-4 rounded-2xl bg-green-50 font-bold"
                value={datos.monto_alquiler} readOnly />
            </div>

            {/* Día de Pago */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Día de Cobro Mensual</label>
              <input type="number" min="1" max="31" className="w-full border p-4 rounded-2xl"
                value={datos.dia_pago_mensual} onChange={(e) => setDatos({...datos, dia_pago_mensual: e.target.value})} required />
            </div>

            {/* Internet */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Monto Internet (S/)</label>
              <input type="number" step="0.01" className="w-full border p-4 rounded-2xl text-blue-600 font-bold"
                value={datos.monto_internet_fijo} onChange={(e) => setDatos({...datos, monto_internet_fijo: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Fecha Inicio */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
                <Calendar size={16}/> Fecha Inicio
              </label>
              <input type="date" className="w-full border p-4 rounded-2xl" required
                value={datos.fecha_inicio} onChange={(e) => setDatos({...datos, fecha_inicio: e.target.value})} />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95 flex justify-center items-center gap-3">
            <Save size={24}/> GENERAR CONTRATO
          </button>
        </form>
      </div>
    </div>
  );
}