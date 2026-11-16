
const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout
} = require('../controllers/authController');

// Registrar usuario
router.post('/register', register);

// Iniciar sesión
router.post('/login', login);

// Cerrar sesión
router.post('/logout', logout);

module.exports = router;
