const Site = require('./model');
const Controller = require('./controller');

describe('getSiteSettings', () => {
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
        Site.fetch.mockRestore();
    });

    it('should send error response on failure', async () => {
        Site.fetch = jest.fn((data, done) => {
            done(new Error('test error'), null);
        });

        Controller.getSiteSettings({}, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls.length).toBe(0);
        expect(mockNext.mock.calls[0][0].message).toBe('test error');
        expect(Site.fetch.mock.calls[0][0]).toEqual({});
    });

    it('should send json response on success', async () => {
        let response = { success: true };
        Site.fetch = jest.fn((data, done) => {
            done(null, response);
        });

        Controller.getSiteSettings({}, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls[0][0]).toBe(200);
        expect(mockResponse.json.mock.calls[0][0]).toEqual(response);
        expect(Site.fetch.mock.calls[0][0]).toEqual({});
    });
});

describe('createSiteSettings', () => {
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
        let req = { body: { setting: true } };
        Controller.createSiteSettings(req, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls.length).toBe(0);
        expect(mockNext.mock.calls[0][0].message).toBe('test error');
        expect(Site.create.mock.calls[0][0]).toEqual(req.body);
    });

    it('should send json response on success', async () => {
        let response = { success: true };
        Site.create = jest.fn((data, done) => {
            done(null, response);
        });
        let req = { body: { setting: true } };
        Controller.createSiteSettings(req, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls[0][0]).toBe(200);
        expect(mockResponse.json.mock.calls[0][0]).toEqual(response);
        expect(Site.create.mock.calls[0][0]).toEqual(req.body);
    });
});

describe('updateSiteSettings', () => {
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
        Site.update.mockRestore();
    });

    it('should send error response on failure', async () => {
        Site.update = jest.fn((data, done) => {
            done(new Error('test error'), null);
        });
        let req = { body: { setting: true } };
        Controller.updateSiteSettings(req, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls.length).toBe(0);
        expect(mockNext.mock.calls[0][0].message).toBe('test error');
        expect(Site.update.mock.calls[0][0]).toEqual(req.body);
    });

    it('should send json response on success', async () => {
        let response = { success: true };
        Site.update = jest.fn((data, done) => {
            done(null, response);
        });
        let req = { body: { setting: true } };
        Controller.updateSiteSettings(req, mockResponse, mockNext);
        expect(mockResponse.status.mock.calls[0][0]).toBe(200);
        expect(mockResponse.json.mock.calls[0][0]).toEqual(response);
        expect(Site.update.mock.calls[0][0]).toEqual(req.body);
    });
});