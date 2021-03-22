const User = require('./model');
const Controller = require('./controller');

describe('getUsers', () => {
    let mockResponse;

    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    afterEach(() => {
        mockResponse.status.mockRestore();
        mockResponse.send.mockRestore();
        mockResponse.json.mockRestore();
        User.fetch.mockRestore();
    });

    it('should send error response on failure', async () => {
        User.fetch = jest.fn((data, done) => {
            done(new Error('test error'), null);
        });

        Controller.getUsers({}, mockResponse);
        expect(mockResponse.status.mock.calls[0][0]).toBe(500);
        expect(mockResponse.send.mock.calls[0][0]).toBe('test error');
        expect(User.fetch.mock.calls[0][0]).toEqual({});
    });

    it('should send json response on success', async () => {
        let response = { success: true };
        User.fetch = jest.fn((data, done) => {
            done(null, response);
        });

        Controller.getUsers({}, mockResponse);
        expect(mockResponse.status.mock.calls[0][0]).toBe(200);
        expect(mockResponse.json.mock.calls[0][0]).toEqual(response);
        expect(User.fetch.mock.calls[0][0]).toEqual({});
    });
});

describe('getUser', () => {
    let mockResponse;
    let req = { params: { userId: '123456' } };
    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    afterEach(() => {
        mockResponse.status.mockRestore();
        mockResponse.send.mockRestore();
        mockResponse.json.mockRestore();
        User.fetch.mockRestore();
    });

    it('should send error response on failure', async () => {
        User.fetch = jest.fn((data, done) => {
            done(new Error('test error'), null);
        });

        Controller.getUser(req, mockResponse);
        expect(mockResponse.status.mock.calls[0][0]).toBe(500);
        expect(mockResponse.send.mock.calls[0][0]).toBe('test error');
        expect(User.fetch.mock.calls[0][0]).toEqual({ id: '123456' });
    });

    it('should send json response on success', async () => {
        let response = { success: true };
        User.fetch = jest.fn((data, done) => {
            done(null, response);
        });

        Controller.getUser(req, mockResponse);
        expect(mockResponse.status.mock.calls[0][0]).toBe(200);
        expect(mockResponse.json.mock.calls[0][0]).toEqual(response);
        expect(User.fetch.mock.calls[0][0]).toEqual({ id: '123456' });
    });
});

describe('createUser', () => {
    let mockResponse;
    let req = { body: { email: 'valid@email.com' } };
    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    afterEach(() => {
        mockResponse.status.mockRestore();
        mockResponse.send.mockRestore();
        mockResponse.json.mockRestore();
        User.create.mockRestore();
    });

    it('should send error response on failure', async () => {
        User.create = jest.fn((data, done) => {
            done(new Error('test error'), null);
        });

        Controller.createUser(req, mockResponse);
        expect(mockResponse.status.mock.calls[0][0]).toBe(500);
        expect(mockResponse.send.mock.calls[0][0]).toBe('test error');
        expect(User.create.mock.calls[0][0]).toEqual(req.body);
    });

    it('should send json response on success', async () => {
        let response = { success: true };
        User.create = jest.fn((data, done) => {
            done(null, response);
        });

        Controller.createUser(req, mockResponse);
        expect(mockResponse.status.mock.calls[0][0]).toBe(200);
        expect(mockResponse.json.mock.calls[0][0]).toEqual(response);
        expect(User.create.mock.calls[0][0]).toEqual(req.body);
    });
});

describe('updateUser', () => {
    let mockResponse;
    let req = { params: { userId: '123456' }, body: { email: 'valid@email.com' } };
    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    afterEach(() => {
        mockResponse.status.mockRestore();
        mockResponse.send.mockRestore();
        mockResponse.json.mockRestore();
        User.update.mockRestore();
    });

    it('should send error response on failure', async () => {
        User.update = jest.fn((data, done) => {
            done(new Error('test error'), null);
        });

        Controller.updateUser(req, mockResponse);
        expect(mockResponse.status.mock.calls[0][0]).toBe(500);
        expect(mockResponse.send.mock.calls[0][0]).toBe('test error');
        expect(User.update.mock.calls[0][0]).toEqual(Object.assign({}, req.body, { id: '123456' }));
    });

    it('should send json response on success', async () => {
        let response = { success: true };
        User.update = jest.fn((data, done) => {
            done(null, response);
        });

        Controller.updateUser(req, mockResponse);
        expect(mockResponse.status.mock.calls[0][0]).toBe(200);
        expect(mockResponse.json.mock.calls[0][0]).toEqual(response);
        expect(User.update.mock.calls[0][0]).toEqual(Object.assign({}, req.body, { id: '123456' }));
    });
});

describe('deleteUser', () => {
    let mockResponse;
    let req = { params: { userId: '123456' } };
    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    afterEach(() => {
        mockResponse.status.mockRestore();
        mockResponse.send.mockRestore();
        mockResponse.json.mockRestore();
        User.remove.mockRestore();
    });

    it('should send error response on failure', async () => {
        User.remove = jest.fn((data, done) => {
            done(new Error('test error'), null);
        });

        Controller.deleteUser(req, mockResponse);
        expect(mockResponse.status.mock.calls[0][0]).toBe(500);
        expect(mockResponse.send.mock.calls[0][0]).toBe('test error');
        expect(User.remove.mock.calls[0][0]).toEqual({ id: '123456' });
    });

    it('should send json response on success', async () => {
        let response = { success: true };
        User.remove = jest.fn((data, done) => {
            done(null, response);
        });

        Controller.deleteUser(req, mockResponse);
        expect(mockResponse.status.mock.calls[0][0]).toBe(200);
        expect(mockResponse.json.mock.calls[0][0]).toEqual(response);
        expect(User.remove.mock.calls[0][0]).toEqual({ id: '123456' });
    });
});