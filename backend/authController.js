const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Tu conexión a la DB

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userRes = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (userRes.rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

        const usuario = userRes.rows[0];
        const validPassword = await bcrypt.compare(password, usuario.password);
        
        if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

        // Generamos el Token
        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, 'TU_FIRMA_SECRETA', { expiresIn: '24h' });
        
        res.json({ token, usuario: { nombre: usuario.nombre, email: usuario.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const registro = async (req, res) => {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const nuevoUser = await db.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email',
            [nombre, email, hashedPassword]
        );
        res.status(201).json(nuevoUser.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "El email ya existe" });
    }
};

module.exports = { login, registro };