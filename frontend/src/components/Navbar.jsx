export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">
          SISTEMA <span className="text-blue-400">ALQUILERES</span>
        </h1>
        <div className="space-x-6">
          <a href="#" className="hover:text-blue-400 transition">Inquilinos</a>
          <a href="#" className="hover:text-blue-400 transition">Propiedades</a>
          <a href="#" className="hover:text-blue-400 transition">Pagos</a>
        </div>
      </div>
    </nav>
  );
}