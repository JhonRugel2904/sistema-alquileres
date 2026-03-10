import { useEffect, useState } from 'react';
import api from '../api/api';
import { FileText, CheckCircle, Clock, Download, Search, Users } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Importación corregida

export default function ListaPagos() {
  const [pagos, setPagos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const cargarPagos = async () => {
    const res = await api.get('/pagos');
    setPagos(res.data);
  };

  useEffect(() => { cargarPagos(); }, []);

  const confirmarPago = async (id) => {
    if (confirm("¿Marcar este recibo como PAGADO?")) {
      await api.put(`/pagos/confirmar/${id}`);
      cargarPagos();
    }
  };

  // --- RECIBO INDIVIDUAL ---
  const generarPDF = (p) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("RECIBO DE ALQUILER", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.text(`Recibo N°: 00${p.id}`, 20, 40);
    doc.text(`Inquilino: ${p.inquilino_nombre}`, 20, 60);
    doc.text(`Unidad: ${p.unidad_nombre}`, 20, 68);
    doc.text(`Periodo: ${p.mes_correspondiente} / ${p.anio_correspondiente}`, 20, 76);

    // USAR autoTable(doc, {...}) en lugar de doc.autoTable({...})
    autoTable(doc, {
      startY: 85,
      head: [['Concepto', 'Monto (S/)']],
      body: [
        ['Alquiler Base', `S/ ${p.monto_alquiler_fijo}`],
        ['Servicio Internet', `S/ ${p.monto_internet_fijo}`],
        ['Consumo Luz', `S/ ${p.monto_luz_variable}`],
        ['Consumo Agua', `S/ ${p.monto_agua_variable}`],
        ['Otros / Extras', `S/ ${p.monto_otros_extra}`],
      ],
      theme: 'grid',
      headStyles: { fillColor: [46, 204, 113] }
    });

    const finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(14);
    doc.text(`TOTAL PAGADO: S/ ${p.total_pagado}`, 140, finalY + 15);
    doc.save(`Recibo_${p.inquilino_nombre}.pdf`);
  };

  // --- HISTORIAL COMPLETO ---
  const descargarHistorialInquilino = () => {
    const nombreBusqueda = filtro.trim().toLowerCase();
    if (!nombreBusqueda) return alert("Escribe el nombre del inquilino en el buscador");

    const pagosCliente = pagos.filter(p => 
      p.inquilino_nombre.toLowerCase().includes(nombreBusqueda)
    );

    if (pagosCliente.length === 0) return alert("No hay registros para este cliente");

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`ESTADO DE CUENTA: ${pagosCliente[0].inquilino_nombre.toUpperCase()}`, 105, 20, { align: "center" });

    const filas = pagosCliente.map(p => [
      `${p.mes_correspondiente}/${p.anio_correspondiente}`,
      p.unidad_nombre,
      `S/ ${p.total_pagado}`,
      p.esta_pagado ? "PAGADO" : "PENDIENTE"
    ]);

    // USAR autoTable(doc, {...}) corregido
    autoTable(doc, {
      startY: 30,
      head: [['Periodo', 'Unidad', 'Total', 'Estado']],
      body: filas,
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save(`Historial_${pagosCliente[0].inquilino_nombre}.pdf`);
  };

  const pagosFiltrados = pagos.filter(p => 
    p.inquilino_nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
          <FileText className="text-blue-600"/> Historial de Pagos
        </h1>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20}/>
            <input 
              type="text" 
              placeholder="Buscar inquilino..." 
              className="pl-10 pr-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
          <button 
            onClick={descargarHistorialInquilino}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            <Users size={18}/> Descargar Historial
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
            <tr>
              <th className="p-5">Inquilino / Periodo</th>
              <th className="p-5">Total</th>
              <th className="p-5">Estado</th>
              <th className="p-5 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pagosFiltrados.map(p => (
              <tr key={p.id} className="hover:bg-blue-50/30 transition">
                <td className="p-5">
                  <div className="font-bold text-gray-800">{p.inquilino_nombre}</div>
                  <div className="text-sm text-gray-500">{p.unidad_nombre} • Mes {p.mes_correspondiente}/{p.anio_correspondiente}</div>
                </td>
                <td className="p-5 font-black text-blue-700">S/ {p.total_pagado}</td>
                <td className="p-5">
                  {p.esta_pagado ? (
                    <span className="flex items-center gap-1 text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded-lg w-fit">
                      <CheckCircle size={14}/> PAGADO
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-orange-500 font-bold text-xs bg-orange-50 px-2 py-1 rounded-lg w-fit">
                      <Clock size={14}/> PENDIENTE
                    </span>
                  )}
                </td>
                <td className="p-5 flex justify-center gap-2">
                  {!p.esta_pagado && (
                    <button 
                      onClick={() => confirmarPago(p.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold transition"
                    >
                      Cobrar
                    </button>
                  )}
                  <button 
                    onClick={() => generarPDF(p)}
                    className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-xs font-bold transition"
                  >
                    <Download size={14}/> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}