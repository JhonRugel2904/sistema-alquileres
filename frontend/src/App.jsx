import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inquilinos from './pages/Inquilinos';
import NuevoInquilino from './pages/NuevoInquilino';
import Propiedades from './pages/Propiedades';
import EditarInquilino from './pages/EditarInquilino';
import NuevaPropiedad from './pages/NuevaPropiedad';
import EditarPropiedad from './pages/EditarPropiedad';
import Unidades from './pages/Unidades';
import NuevaUnidad from './pages/NuevaUnidad';
import EditarUnidad from './pages/EditarUnidad';
import Contratos from './pages/Contratos';
import NuevoContrato from './pages/Nuevocontrato';
import EditarContrato from './pages/Editarcontrato';
import NuevoPago from './pages/NuevoPago';
import ListaPagos from './pages/ListaPagos';

// IMPORTA SOLO EL NUEVO COMPONENTE QUE CREAMOS (Ajusta la ruta si es necesario)
import AuthPage from './pages/Login'; 

function App() {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Solo mostramos Navbar si estamos logueados */}
        {isAuthenticated && <Navbar />}
        
        <main className={isAuthenticated ? "container mx-auto mt-8 px-4 pb-10" : ""}>
          <Routes>
            {/* RUTA DE AUTENTICACIÓN (LOGIN/REGISTRO TODO EN UNO) */}
            <Route path="/login" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" />} />

            {/* RUTAS PROTEGIDAS */}
            <Route path="/" element={isAuthenticated ? <Inquilinos /> : <Navigate to="/login" />} />
            <Route path="/nuevo-inquilino" element={isAuthenticated ? <NuevoInquilino /> : <Navigate to="/login" />} />
            <Route path="/editar-inquilino/:id" element={isAuthenticated ? <EditarInquilino /> : <Navigate to="/login" />} />

            <Route path="/propiedades" element={isAuthenticated ? <Propiedades /> : <Navigate to="/login" />} />
            <Route path="/nueva-propiedad" element={isAuthenticated ? <NuevaPropiedad /> : <Navigate to="/login" />} />
            <Route path="/editar-propiedad/:id" element={isAuthenticated ? <EditarPropiedad /> : <Navigate to="/login" />} />

            <Route path="/unidades" element={isAuthenticated ? <Unidades /> : <Navigate to="/login" />} />
            <Route path="/nueva-unidad" element={isAuthenticated ? <NuevaUnidad /> : <Navigate to="/login" />} /> 
            <Route path="/nueva-unidad/:propiedad_id" element={isAuthenticated ? <NuevaUnidad /> : <Navigate to="/login" />} /> 
            <Route path="/editar-unidad/:id" element={isAuthenticated ? <EditarUnidad /> : <Navigate to="/login" />} />

            <Route path="/contratos" element={isAuthenticated ? <Contratos /> : <Navigate to="/login" />} />
            <Route path="/nuevo-contrato" element={isAuthenticated ? <NuevoContrato /> : <Navigate to="/login" />} />
            <Route path="/editar-contrato/:id" element={isAuthenticated ? <EditarContrato /> : <Navigate to="/login" />} />

            <Route path="/pagos/nuevo" element={isAuthenticated ? <NuevoPago /> : <Navigate to="/login" />} />
            <Route path="/pagos" element={isAuthenticated ? <ListaPagos /> : <Navigate to="/login" />} />

            {/* Redirección automática */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;