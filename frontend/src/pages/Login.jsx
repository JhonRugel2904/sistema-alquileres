import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Lock, Mail, Building2 } from 'lucide-react';

export default function Login() {
  const [datos, setDatos] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', datos);
      localStorage.setItem('token', res.data.token); // Guardamos el acceso
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      navigate('/'); // Vamos al inicio
    } catch (err) {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Building2 size={50} className="text-blue-600 mb-2" />
          <h1 className="text-2xl font-black text-gray-800">Panel Administrativo</h1>
          <p className="text-gray-500 text-sm">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20}/>
              <input type="email" required className="w-full pl-10 p-3.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
                onChange={e => setDatos({...datos, email: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20}/>
              <input type="password" required className="w-full pl-10 p-3.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" 
                onChange={e => setDatos({...datos, password: e.target.value})} />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg active:scale-95">
            ENTRAR AL SISTEMA
          </button>
        </form>
      </div>
    </div>
  );
}