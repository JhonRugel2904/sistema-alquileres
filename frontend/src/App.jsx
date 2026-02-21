import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inquilinos from './pages/Inquilinos';
import NuevoInquilino from './pages/NuevoInquilino'; // La nueva página
import Propiedades from './pages/Propiedades';
import EditarInquilino from './pages/EditarInquilino';



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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;