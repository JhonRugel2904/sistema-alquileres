import { Link } from 'react-router-dom';
import { Home, Users, Building2, CreditCard, LayoutGrid } from 'lucide-react'; // Agregamos LayoutGrid

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Título */}
        <Link to="/" className="text-xl font-bold flex items-center gap-2 hover:text-blue-400 transition">
          <Building2 className="text-blue-500" size={24} />
          <span>Sistema Alquileres</span>
        </Link>

        {/* Enlaces de Navegación */}
        <div className="flex gap-6 font-medium">
          <Link to="/" className="hover:text-blue-400 transition flex items-center gap-1">
            <Users size={18} /> Inquilinos
          </Link>
          
          {/* Propiedades = Edificios/Casas */}
          <Link to="/propiedades" className="hover:text-blue-400 transition flex items-center gap-1">
            <Building2 size={18} /> Propiedades
          </Link>
          
          {/* Unidades = Cuartos/Depas (Cambiamos el icono a LayoutGrid para que se distinga) */}
          <Link to="/unidades" className="hover:text-blue-400 transition flex items-center gap-1">
            <LayoutGrid size={18} /> Unidades
          </Link>

          <Link to="/pagos" className="hover:text-blue-400 transition flex items-center gap-1">
            <CreditCard size={18} /> Pagos
          </Link>
        </div>
      </div>
    </nav>
  );
}