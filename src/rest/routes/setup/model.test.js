
const Setup = require('./model');
const User = require('../users/model');
const Site = require('../site/model');

const mockDone = jest.fn((error, data) => { });
const testData = {
    email_id: 'sa@email.com',
    password: '123456'
}

jest.mock('./default.js', () => ({
    email_id: 'sa@email.com',
    password: '123456',
    name: 'test',
    description: 'test description'
}));

describe('create', () => {

    afterEach(() => {
        User.create.mockRestore();
        Site.create.mockRestore();
        mockDone.mockRestore();
    });

    it('should error if credentials does not match env properties', async () => {
        User.create = jest.fn();
        Site.create = jest.fn();

        await Setup.create({ email_id: 'invalid@mail.com', password: 'invalid_password' }, mockDone);

        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0].message).toBe('Credentials did not match');

        expect(User.create.mock.calls.length).toBe(0);
        expect(Site.create.mock.calls.length).toBe(0);
    });

    it('should error if user already exists', async () => {
        User.create = jest.fn((params, cb) => {
            cb(new Error('user error'), null);
        });
        Site.create = jest.fn();

        await Setup.create(testData, mockDone);

        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0].message).toBe('user error');

        let modData = { ...testData };
        modData.credentials = { super_admin: true }
        modData.email_verified = true;
        expect(User.create.mock.calls[0][0]).toEqual({
            email_id: 'sa@email.com',
            password: '123456',
            email_verified: true,
            claims: { super_admin: true }
        });
    });

    it('should error if site doc exists', async () => {
        User.create = jest.fn((params, cb) => {
            cb(null, {});
        });
        Site.create = jest.fn((params, cb) => {
            cb(new Error('site error'), null);
        });

        await Setup.create(testData, mockDone);

        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0].message).toBe('site error');
        expect(Site.create.mock.calls[0][0]).toEqual({ name: 'test', description: 'test description' });
    });

    it('should setup user and site doc', async () => {
        User.create = jest.fn((params, cb) => {
            cb(null, {});
        });

        Site.create = jest.fn((params, cb) => {
            cb(null, {});
        });

        await Setup.create(testData, mockDone);

        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(mockDone.mock.calls[0][1]).toEqual({ success: true });
    });

});