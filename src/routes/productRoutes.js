
const express = require('express');
const router = express.Router();

const verificarToken = require('../middleware/authMiddleware');

const {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productController');

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Consultar productos
router.get('/', obtenerProductos);

// Crear producto
router.post('/', crearProducto);

// Actualizar producto
router.put('/:id', actualizarProducto);

// Eliminar producto
router.delete('/:id', eliminarProducto);

module.exports = router;
