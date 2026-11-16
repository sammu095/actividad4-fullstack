
const User = require('../src/models/User');

const {
    register,
    login
} = require('../src/controllers/authController');

jest.mock('../src/models/User');

describe('Pruebas del controlador de autenticación', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe rechazar el registro si faltan campos', async () => {
        const req = {
            body: {
                nombre: '',
                email: '',
                password: ''
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('Debe rechazar un correo ya registrado', async () => {
        User.findOne.mockResolvedValue({
            email: 'prueba@correo.com'
        });

        const req = {
            body: {
                nombre: 'Samuel',
                email: 'prueba@correo.com',
                password: '12345678'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('Debe rechazar credenciales incorrectas', async () => {
        User.findOne.mockResolvedValue(null);

        const req = {
            body: {
                email: 'incorrecto@correo.com',
                password: '12345678'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });

});
