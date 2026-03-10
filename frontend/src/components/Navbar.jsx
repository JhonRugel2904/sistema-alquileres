import { Link } from 'react-router-dom';
import { Users, Building2, CreditCard, LayoutGrid, FileText, DollarSign } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Título */}
        <Link to="/" className="text-xl font-bold flex items-center gap-2 hover:text-blue-400 transition">
          <Building2 className="text-blue-500" size={24} />
          <span>Sistema Alquileres</span>
        </Link>

        {/* Enlaces de Navegación */}
        <div className="flex gap-6 font-medium text-sm">
          <Link to="/" className="hover:text-blue-400 transition flex items-center gap-1">
            <Users size={18} /> Inquilinos
          </Link>
          
          <Link to="/unidades" className="hover:text-blue-400 transition flex items-center gap-1">
            <LayoutGrid size={18} /> Unidades
          </Link>

          <Link to="/contratos" className="hover:text-blue-400 transition flex items-center gap-1">
            <FileText size={18} /> Contratos
          </Link>

          {/* ACCESO A HISTORIAL DE PAGOS */}
          <Link to="/pagos" className="hover:text-blue-400 transition flex items-center gap-1">
            <CreditCard size={18} /> Historial
          </Link>

          {/* BOTÓN RESALTADO PARA NUEVO COBRO */}
          <Link to="/pagos/nuevo" className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition flex items-center gap-1 font-bold shadow-md">
            <DollarSign size={18} /> Registrar Cobro
          </Link>
        </div>
      </div>
    </nav>
  );
}