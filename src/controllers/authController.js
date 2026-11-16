
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registrar usuario
const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                mensaje: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

        const usuarioExiste = await User.findOne({ email });

        if (usuarioExiste) {
            return res.status(400).json({
                mensaje: 'El correo ya está registrado'
            });
        }

        const usuario = new User({
            nombre,
            email,
            password
        });

        await usuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// Iniciar sesión
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await User.findOne({ email });

        if (!usuario || !(await usuario.compararPassword(password || ''))) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

// Cerrar sesión
const logout = (req, res) => {
    res.json({
        mensaje: 'Sesión cerrada. Elimina el token del cliente.'
    });
};

module.exports = {
    register,
    login,
    logout
};
