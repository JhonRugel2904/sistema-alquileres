# 🏢 Sistema de Gestión de Alquileres Pro

Sistema integral para la administración de inquilinos, unidades inmobiliarias, contratos y control de pagos. Diseñado con una arquitectura moderna Fullstack (PERN Stack).

## 🚀 Características Principales

* **Autenticación Segura:** Login y Registro con encriptación de contraseñas mediante `bcryptjs` y sesiones manejadas con `JWT`.
* **Gestión de Inquilinos:** CRUD completo para la administración de arrendatarios.
* **Control de Unidades:** Administración de departamentos, cuartos o locales.
* **Contratos y Pagos:** Registro de contratos vinculados y gestión de historial de cobros.
* **Interfaz Moderna:** Dashboard interactivo construido con React, Tailwind CSS y Lucide Icons.

## 🛠️ Tecnologías Utilizadas

### Frontend
* **React.js** (Vite)
* **Tailwind CSS** (Estilos)
* **React Router Dom** (Navegación)
* **Axios** (Peticiones API)
* **Lucide React** (Iconografía)

### Backend
* **Node.js & Express**
* **PostgreSQL** (Base de datos relacional)
* **node-postgres (pg)** (Driver de conexión)
* **JSON Web Tokens** (Seguridad)

---

## ⚙️ Configuración del Proyecto

### 1. Requisitos Previos
* Node.js instalado (v18 o superior)
* PostgreSQL corriendo localmente.

### 2. Base de Datos
Ejecuta el siguiente script en tu consola de PostgreSQL para preparar las tablas de seguridad:

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

PORT=3000
DB_USER=tu_usuario
DB_HOST=localhost
DB_NAME=sistema_alquileres
DB_PASSWORD=tu_password
DB_PORT=5432
JWT_SECRET=clave_maestra_segura_123



4. Instalación
En ambas carpetas (frontend y backend), ejecuta:

Bash
npm install
5. Ejecución
Backend: npm run dev (desde la carpeta backend)

Frontend: npm run dev (desde la carpeta frontend)

📂 Estructura del Backend (src)
app.js: Punto de entrada del servidor.

config/db.js: Configuración del Pool de conexión a Postgres.

controllers/: Lógica de negocio (auth, inquilinos, etc.).

routes/: Definición de endpoints de la API.


---

## 💡 Próximos Pasos e Implementaciones

Ya que tienes el núcleo funcionando, aquí tienes algunas ideas de qué más puedes "meterle" para que sea una aplicación de nivel empresarial:

1.  **Protección de Rutas en el Backend (Middleware):**
    * Actualmente, si alguien sabe la URL del backend, podría intentar borrar un inquilino. Necesitamos un archivo `authMiddleware.js` que verifique el token JWT antes de permitir acciones en las rutas de inquilinos o pagos.

2.  **Dashboard de Estadísticas:**
    * Una página de "Inicio" que te diga: ¿Cuántos inquilinos deben mes?, ¿Cuánto dinero se ha cobrado este mes?, ¿Cuántas unidades están vacías?

3.  **Generación de Recibos en PDF:**
    * Al registrar un cobro, que el sistema genere automáticamente un PDF para enviarle al inquilino por WhatsApp.

4.  **Subida de Archivos:**
    * Poder subir una foto del contrato firmado o del DNI del inquilino directamente al perfil.



---

**¡Estoy listo para tus dudas!** Dime qué parte te genera curiosidad o qué función te gust