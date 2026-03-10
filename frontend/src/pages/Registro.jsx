import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { User, Mail, Lock, Building2 } from 'lucide-react';

export default function Registro() {
  const [datos, setDatos] = useState({ nombre: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/registro', datos);
      alert("✅ Usuario creado con éxito. Ahora puedes iniciar sesión.");
      navigate('/login');
    } catch (err) {
      alert("❌ Error al registrar: El correo ya existe.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <Building2 size={40} className="text-blue-600 mb-2" />
          <h2 className="text-2xl font-black text-gray-800">Crear Cuenta</h2>
        </div>

        <form onSubmit={handleRegistro} className="space-y-4">
          <input type="text" placeholder="Nombre Completo" required className="w-full p-3.5 border rounded-xl bg-gray-50"
            onChange={e => setDatos({...datos, nombre: e.target.value})} />
          
          <input type="email" placeholder="Correo Electrónico" required className="w-full p-3.5 border rounded-xl bg-gray-50"
            onChange={e => setDatos({...datos, email: e.target.value})} />
          
          <input type="password" placeholder="Contraseña" required className="w-full p-3.5 border rounded-xl bg-gray-50"
            onChange={e => setDatos({...datos, password: e.target.value})} />

          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
            REGISTRARME
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500 text-sm">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 font-bold">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}