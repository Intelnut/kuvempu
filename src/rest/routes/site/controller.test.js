const Site = require('./model');
const Controller = require('./controller');

describe('createSetup', () => {
    let mockResponse;
    let mockNext;

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
        Site.create.mockRestore();
    });

    it('should send error response on failure', async () => {
        Site.create = jest.fn((data, done) => {
            done(new Error('test error'), null);
        });

        Controller.createSetup({ setup: true }, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls.length).toBe(0);
        expect(mockNext.mock.calls[0][0].message).toBe('test error');
        expect(Site.create.mock.calls[0][0]).toEqual({ setup: true });
    });

    it('should send json response on success', async () => {
        let response = { success: true };
        Site.create = jest.fn((data, done) => {
            done(null, response);
        });

        Controller.createSetup({ setup: true }, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls[0][0]).toBe(200);
        expect(mockResponse.json.mock.calls[0][0]).toEqual(response);
        expect(Site.create.mock.calls[0][0]).toEqual({ setup: true });
    });
});