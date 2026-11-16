
const request = require('supertest');

jest.mock('../src/controllers/authController', () => ({
    register: (req, res) => res.status(201).json({
        mensaje: 'Usuario registrado correctamente'
    }),
    login: (req, res) => res.status(200).json({
        mensaje: 'Inicio de sesión exitoso'
    }),
    logout: (req, res) => res.status(200).json({
        mensaje: 'Sesión cerrada'
    })
}));

jest.mock('../src/controllers/productController', () => ({
    obtenerProductos: (req, res) => res.status(200).json([]),
    crearProducto: (req, res) => res.status(201).json({
        mensaje: 'Producto creado correctamente'
    }),
    actualizarProducto: (req, res) => res.status(200).json({
        mensaje: 'Producto actualizado correctamente'
    }),
    eliminarProducto: (req, res) => res.status(200).json({
        mensaje: 'Producto eliminado correctamente'
    })
}));

jest.mock('../src/middleware/authMiddleware', () =>
    (req, res, next) => next()
);

const app = require('../server');

describe('Pruebas de rutas de la aplicación', () => {

    test('Debe permitir registrar un usuario', async () => {
        const respuesta = await request(app)
            .post('/api/auth/register')
            .send({
                nombre: 'Samuel',
                email: 'prueba@correo.com',
                password: '12345678'
            });

        expect(respuesta.status).toBe(201);
        expect(respuesta.body.mensaje).toBe(
            'Usuario registrado correctamente'
        );
    });

    test('Debe permitir iniciar sesión', async () => {
        const respuesta = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'prueba@correo.com',
                password: '12345678'
            });

        expect(respuesta.status).toBe(200);
    });

    test('Debe permitir consultar productos', async () => {
        const respuesta = await request(app)
            .get('/api/products');

        expect(respuesta.status).toBe(200);
        expect(respuesta.body).toEqual([]);
    });

    test('Debe permitir crear un producto', async () => {
        const respuesta = await request(app)
            .post('/api/products')
            .send({
                nombre: 'Laptop HP',
                descripcion: 'Laptop para oficina',
                precio: 12500,
                stock: 10,
                categoria: 'Electronica'
            });

        expect(respuesta.status).toBe(201);
    });

});
