import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inquilinos from './pages/Inquilinos';
import NuevoInquilino from './pages/NuevoInquilino'; // La nueva página
import Propiedades from './pages/Propiedades';
import EditarInquilino from './pages/EditarInquilino';
import NuevaPropiedad from './pages/NuevaPropiedad';
import EditarPropiedad from './pages/EditarPropiedad';
import Unidades from './pages/Unidades';
import NuevaUnidad from './pages/NuevaUnidad'; // El formulario que pasaste
import EditarUnidad from './pages/EditarUnidad';
import Contratos from './pages/Contratos';
import NuevoContrato from './pages/Nuevocontrato';
import EditarContrato from './pages/Editarcontrato';
import NuevoPago from './pages/NuevoPago';
import ListaPagos from './pages/ListaPagos';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto mt-8 px-4">
          <Routes>
            {/* INQUILINOS */}
            <Route path="/" element={<Inquilinos />} />
            <Route path="/nuevo-inquilino" element={<NuevoInquilino />} />
            <Route path="/editar-inquilino/:id" element={<EditarInquilino />} />
  {/* PROPIEDADES (Edificios) */}
            <Route path="/propiedades" element={<Propiedades />} />
            <Route path="/nueva-propiedad" element={<NuevaPropiedad />} />
            <Route path="/editar-propiedad/:id" element={<EditarPropiedad />} />
  {/* UNIDADES (Cuartos) */}
            <Route path="/unidades" element={<Unidades />} />
  {/* Esta es la ruta para crear unidad desde la lista de unidades */}
            <Route path="/nueva-unidad" element={<NuevaUnidad />} /> 
  {/* Esta es si vienes desde una propiedad específica */}
            <Route path="/nueva-unidad/:propiedad_id" element={<NuevaUnidad />} /> 
            <Route path="/editar-unidad/:id" element={<EditarUnidad />} />
  {/* CONTRATOS */}
            <Route path="/contratos" element={<Contratos />} />
            <Route path="/nuevo-contrato" element={<NuevoContrato />} />
            <Route path="/editar-contrato/:id" element={<EditarContrato />} />
  {/* PAGOS */}
            <Route path="/pagos/nuevo" element={<NuevoPago />} />
            <Route path="/pagos" element={<ListaPagos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;