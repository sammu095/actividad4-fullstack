
const Product = require('../models/Product');

// Obtener todos los productos del usuario
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Product.find({
            usuario: req.usuario.id
        });

        res.json(productos);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener productos',
            error: error.message
        });
    }
};

// Crear producto
const crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoria } = req.body;

        if (!nombre || !descripcion || precio === undefined ||
            stock === undefined || !categoria) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        const producto = new Product({
            nombre,
            descripcion,
            precio,
            stock,
            categoria,
            usuario: req.usuario.id
        });

        await producto.save();

        res.status(201).json({
            mensaje: 'Producto creado correctamente',
            producto
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear producto',
            error: error.message
        });
    }
};

// Actualizar producto
const actualizarProducto = async (req, res) => {
    try {
        const producto = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                usuario: req.usuario.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto actualizado correctamente',
            producto
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar producto',
            error: error.message
        });
    }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
    try {
        const producto = await Product.findOneAndDelete({
            _id: req.params.id,
            usuario: req.usuario.id
        });

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar producto',
            error: error.message
        });
    }
};

module.exports = {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
