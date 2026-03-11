import { useState } from 'react';
import api from '../api/api';
import { Lock, Mail, User, Building2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AuthPage() {
  const [esRegistro, setEsRegistro] = useState(false);
  const [datos, setDatos] = useState({ nombre: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = esRegistro ? '/auth/registro' : '/auth/login';
      const res = await api.post(endpoint, datos);
      
      if (!esRegistro) {
        localStorage.setItem('token', res.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        window.location.href = '/'; 
      } else {
        alert("¡Cuenta creada! Ahora inicia sesión.");
        setEsRegistro(false);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error en la autenticación");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Círculos decorativos de fondo (Efecto Neón) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 shadow-2xl overflow-hidden z-10">
        
        {/* Lado Izquierdo: Visual/Informativo */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative">
          <Building2 size={60} className="mb-6 opacity-80" />
          <h1 className="text-4xl font-black leading-tight mb-4">
            Gestiona tus <br /> Alquileres Pro.
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Control total de inquilinos, contratos y cobranzas en un solo lugar. Simple, rápido y seguro.
          </p>
          <div className="flex items-center gap-3 bg-white/10 w-fit p-3 rounded-2xl backdrop-blur-md border border-white/20">
            <ShieldCheck className="text-green-400" />
            <span className="text-sm font-medium">Acceso Encriptado SSL</span>
          </div>
        </div>

        {/* Lado Derecho: Formulario */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-800">
              {esRegistro ? 'Crea tu cuenta' : '¡Bienvenido!'}
            </h2>
            <p className="text-gray-500 mt-2">
              {esRegistro ? 'Completa los datos para empezar' : 'Ingresa tus credenciales de acceso'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {esRegistro && (
              <div className="group">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group-focus-within:border-blue-500 transition-all">
                  <User className="text-gray-400" size={20} />
                  <input 
                    type="text" placeholder="Nombre completo" required
                    className="bg-transparent w-full outline-none text-gray-700 font-medium"
                    onChange={e => setDatos({...datos, nombre: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="group">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group-focus-within:border-blue-500 transition-all">
                <Mail className="text-gray-400" size={20} />
                <input 
                  type="email" placeholder="Correo electrónico" required
                  className="bg-transparent w-full outline-none text-gray-700 font-medium"
                  onChange={e => setDatos({...datos, email: e.target.value})}
                />
              </div>
            </div>

            <div className="group">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group-focus-within:border-blue-500 transition-all">
                <Lock className="text-gray-400" size={20} />
                <input 
                  type="password" placeholder="Contraseña" required
                  className="bg-transparent w-full outline-none text-gray-700 font-medium"
                  onChange={e => setDatos({...datos, password: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-xl shadow-blue-200">
              {esRegistro ? 'REGISTRARME AHORA' : 'ENTRAR AL PANEL'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setEsRegistro(!esRegistro)}
              className="text-gray-500 font-bold hover:text-blue-600 transition"
            >
              {esRegistro ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate gratis'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}