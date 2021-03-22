const Login = require('./model');
const Controller = require('./controller');

describe('loginUser', () => {

    beforeEach(() => {
        mockNext = jest.fn();
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    });

    afterEach(() => {
        mockResponse.status.mockRestore();
        mockResponse.json.mockRestore();
        mockNext.mockRestore();
        Login.create.mockRestore();
    });

    it('should send error response on failure', async () => {
        Login.create = jest.fn((data, done) => {
            let error = new Error();
            error.code = 'login error';
            done(error, null);
        });
        let req = { body: { email_id: 'valid@email.com', password: '123456' } }
        Controller.loginUser(req, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls.length).toBe(0);
        expect(mockNext.mock.calls[0][0].message).toBe('login error');
        expect(Login.create.mock.calls[0][0]).toEqual(req.body);
    });

    it('should send json response on success', async () => {
        let response = { token: 'ABCD' };
        let req = { body: { email_id: 'valid@email.com', password: '123456' } }
        Login.create = jest.fn((data, done) => {
            done(null, response);
        });

        Controller.loginUser(req, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls[0][0]).toBe(200);
        expect(mockResponse.json.mock.calls[0][0]).toEqual(response);
        expect(Login.create.mock.calls[0][0]).toEqual(req.body);
    });
})