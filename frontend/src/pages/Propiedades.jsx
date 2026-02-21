import { useEffect, useState } from 'react';
import api from '../api/api';
import { Home, MapPin, CheckCircle, XCircle } from 'lucide-react';

export default function Propiedades() {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarPropiedades = async () => {
    try {
      setLoading(true);
      const res = await api.get('/propiedades');
      setPropiedades(res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarPropiedades(); }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <Home className="text-blue-600" size={32} /> Inventario de Propiedades
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {propiedades.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                <Home size={24} />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                p.estado === 'disponible' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {p.estado}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">{p.nombre}</h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <MapPin size={16} /> {p.direccion}
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-2xl font-black text-blue-600">S/ {p.precio_mensual}</span>
              <button className="text-sm font-bold text-blue-500 hover:underline">Ver detalles</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}