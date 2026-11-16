
const app = require('../server');
const connectDB = require('../src/config/db');

module.exports = async (req, res) => {
    try {
        await connectDB();
        return app(req, res);
    } catch (error) {
        console.error('Error de conexión:', error.message);

        return res.status(500).json({
            mensaje: 'Error al conectar con MongoDB'
        });
    }
};
