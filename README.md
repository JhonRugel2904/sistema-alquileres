# 🏢 Sistema de Gestión de Alquileres Pro

> Una solución Fullstack moderna para administrar propiedades, contratos y cobranzas con eficiencia y elegancia.

---

![Banner del Proyecto](https://via.placeholder.com/800x400?text=Dashboard+Sistema+Alquileres) 
*(Sugerencia: Reemplaza este link por un GIF de tu aplicación funcionando o una captura de pantalla de tu Login/Dashboard)*

---

## 🚀 Vista Previa
| Login Page | Dashboard | Registro de Pagos |
|---|---|---|
| ![Login](https://via.placeholder.com/250x150) | ![Dashboard](https://via.placeholder.com/250x150) | ![Pagos](https://via.placeholder.com/250x150) |

---

## 📋 Descripción
Este sistema fue diseñado para digitalizar el control de alquileres. Permite desde el registro seguro de administradores hasta el seguimiento detallado de estados de cuenta por contrato, utilizando una arquitectura **PERN Stack** (PostgreSQL, Express, React, Node.js).

## ✨ Características Principales
* **🔐 Autenticación Robusta:** Login/Registro con contraseñas encriptadas (`bcryptjs`) y sesiones vía `JWT`.
* **👥 Gestión de Inquilinos:** CRUD completo (Crear, Leer, Actualizar, Borrar).
* **🏠 Control de Unidades:** Gestión de propiedades y sus respectivas unidades/cuartos.
* **📑 Contratos Inteligentes:** Vinculación de inquilinos con unidades y montos de renta.
* **💰 Historial de Pagos:** Registro de ingresos y consulta de historial de cobranza.
* **🎨 UI/UX Premium:** Interfaz responsive con Tailwind CSS, modo oscuro y efectos Glassmorphism.

## 🛠️ Tecnologías Utilizadas
### Frontend
* **React.js** (Vite) + **React Router Dom**
* **Tailwind CSS** (Diseño y Layout)
* **Lucide React** (Iconografía Moderna)
* **Axios** (Consumo de API)

### Backend
* **Node.js & Express**
* **PostgreSQL** (Persistencia de Datos)
* **Bcrypt.js** (Seguridad de Credenciales)
* **JWT** (Tokens de Acceso)

---

## ⚙️ Configuración e Instalación Local

### 1. Base de Datos (PostgreSQL)
Crea una base de datos llamada `sistema_alquileres` y ejecuta los siguientes scripts iniciales:

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Nota: Asegúrate de tener también tus tablas de inquilinos, unidades y pagos creadas.

Configura el archivo .env en la carpeta backend/:
PORT=3000
DB_USER=tu_usuario_postgres
DB_HOST=localhost
DB_NAME=sistema_alquileres
DB_PASSWORD=tu_contraseña
DB_PORT=5432
JWT_SECRET=tu_firma_secreta_aqui

4. Instalación y Despliegue
En la raíz de ambas carpetas (frontend y backend):
npm install

Para iniciar el entorno de desarrollo:

Backend: npm run dev

Frontend: npm run dev

🚀 Próximas Implementaciones (Roadmap)
[ ] Exportación PDF: Generar recibos de pago con un solo click.

[ ] Dashboard Analytics: Gráficos estadísticos de ingresos mensuales.

[ ] Cloud Storage: Subida de documentos de identidad y contratos en PDF.

[ ] WhatsApp Integration: Envío de recordatorios de pago automáticos.

👤 Autor
Desarrollado con pasión por Jhon.

GitHub

LinkedIn

© 2026 - Sistema de Gestión Inmobiliaria


---



### ¿Qué sigue ahora?
Cuando estés listo para subirlo a **GitHub**, no olvides añadir tus fotos reales donde están los cuadros de `via.placeholder`. 

**¿Quieres que te guíe con los comandos para subir todo esto a GitHub por primera