
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({
                mensaje: 'Acceso denegado. Debes iniciar sesión.'
            });
        }

        const token = authorization.split(' ')[1];

        const verificado = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = verificado;

        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: 'Token inválido o expirado.'
        });
    }
};

module.exports = verificarToken;
