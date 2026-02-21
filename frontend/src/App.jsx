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


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto mt-8 px-4">
          <Routes>
            <Route path="/" element={<Inquilinos />} />
            <Route path="/nuevo-inquilino" element={<NuevoInquilino />} />
            <Route path="/propiedades" element={<Propiedades />} />
            <Route path="/editar-inquilino/:id" element={<EditarInquilino />} />
            <Route path="/nueva-propiedad" element={<NuevaPropiedad />} />
            <Route path="/editar-propiedad/:id" element={<EditarPropiedad />} />
            <Route path="/nueva-unidad/:id" element={<EditarPropiedad />} />
            <Route path="/unidades" element={<Unidades />} />
            <Route path="/nueva-unidad" element={<NuevaUnidad />} />
            <Route path="/editar-unidad/:id" element={<EditarUnidad />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;