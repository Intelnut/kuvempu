require('firebase-functions-test')();
const { auth, database } = require('../config/firebase');
const User = require('./model');

const mockDone = jest.fn((error, data) => { });

describe('create', () => {

    beforeEach(() => {
        auth.createUser = jest.fn(() => {
            return {
                uid: '123456'
            }
        });
    })

    afterEach(() => {
        mockDone.mockRestore();
        auth.createUser.mockRestore();
    });

    test('should error if email and password is invalid', async () => {
        await User.create({}, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(auth.createUser.mock.calls.length).toBe(0);
        expect(mockDone.mock.calls[0][0].message).toBe('Email id is invalid & Password is invalid');
        expect(mockDone.mock.calls[0][1]).toBe(null);
    });

    test('should error if email is invalid', async () => {
        await User.create({ email_id: 'invalid', password: 'test123' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(auth.createUser.mock.calls.length).toBe(0);
        expect(mockDone.mock.calls[0][0].message).toBe('Email id is invalid');
        expect(mockDone.mock.calls[0][1]).toBe(null);
    });

    test('should error if password is invalid', async () => {
        await User.create({ email_id: 'valid@email.com' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(auth.createUser.mock.calls.length).toBe(0);
        expect(mockDone.mock.calls[0][0].message).toBe('Password is invalid');
        expect(mockDone.mock.calls[0][1]).toBe(null);
    });

    test('should create a new user', async () => {
        await User.create({ email_id: 'valid@email.com', password: 'test123' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(auth.createUser.mock.calls.length).toBe(1);
        expect(auth.createUser.mock.calls[0][0]).toEqual({
            email: 'valid@email.com',
            password: 'test123',
            photoURL: 'https://avatars.dicebear.com/api/initials/valid.svg',
        });
        expect(mockDone.mock.calls[0][1]).toEqual({
            email_id: 'valid@email.com',
            id: '123456',
            photo_url: 'https://avatars.dicebear.com/api/initials/valid.svg',
        });
    });

});
