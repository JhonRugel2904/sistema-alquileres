import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-10 bg-blue-600 rounded-3xl shadow-2xl border-4 border-blue-400">
        <h1 className="text-5xl font-extrabold mb-4 italic">
          ¡CONECTADO! 🚀
        </h1>
        <p className="text-xl font-light">
          Tailwind ya está corriendo en tu proyecto, Jhon.
        </p>
      </div>
    </div>
  );
}

export default App;
