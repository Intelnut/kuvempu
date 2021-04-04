const Setup = require('./model');
const Controller = require('./controller');

describe('createSetup', () => {
    let mockResponse;
    let mockNext;
    let request = { body: { email_id: 'test@mail.com', password: '123456' } };

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
        Setup.create.mockRestore();
    });

    it('should send error response on failure', async () => {
        Setup.create = jest.fn((data, done) => {
            done(new Error('test error'), null);
        });

        Controller.createSetup(request, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls.length).toBe(0);
        expect(mockNext.mock.calls[0][0].message).toBe('test error');
        expect(Setup.create.mock.calls[0][0]).toEqual(request.body);
    });

    it('should send json response on success', async () => {
        let response = { success: true };
        Setup.create = jest.fn((data, done) => {
            done(null, response);
        });

        Controller.createSetup(request, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls[0][0]).toBe(200);
        expect(mockResponse.json.mock.calls[0][0]).toEqual(response);
        expect(Setup.create.mock.calls[0][0]).toEqual(request.body);
    });
});
