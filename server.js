
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');

const app = express();

// Middlewares generales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mostrar archivos HTML de la carpeta public
app.use(express.static('public'));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas protegidas de productos
app.use('/api/products', productRoutes);

// Ruta principal
app.get('/api', (req, res) => {
    res.json({
        mensaje: 'API de Gestión de Productos funcionando correctamente',
        estado: 'Activo'
    });
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar servidor
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
    }
};

if (require.main === module) {
    startServer();
}

module.exports = app;
