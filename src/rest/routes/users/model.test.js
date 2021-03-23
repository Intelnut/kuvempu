require('firebase-functions-test')();
const { auth, database } = require('../../config/firebase');
const User = require('./model');

const mockDone = jest.fn((error, data) => { });

describe('create', () => {

    beforeEach(() => {
        auth.createUser = jest.fn(() => {
            return {
                uid: '123456'
            }
        });
    });

    afterEach(() => {
        mockDone.mockRestore();
        auth.createUser.mockRestore();
    });

    afterAll(async () => {
        const userDocumentRef = database.doc(`/users/123456`);
        await userDocumentRef.delete();
    });

    it('should create a new user', async () => {
        await User.create({ email_id: 'valid@email.com', password: 'test123' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(auth.createUser.mock.calls.length).toBe(1);
        expect(auth.createUser.mock.calls[0][0]).toEqual({
            email: 'valid@email.com',
            password: 'test123',
            photoURL: 'https://avatars.dicebear.com/api/initials/valid.svg',
            emailVerified: true
        });
        expect(mockDone.mock.calls[0][1]).toEqual({
            email_id: 'valid@email.com',
            id: '123456',
            photo_url: 'https://avatars.dicebear.com/api/initials/valid.svg',
        });
    });

});

describe('remove', () => {

    beforeEach(() => {
        auth.deleteUser = jest.fn();
    });

    afterEach(() => {
        mockDone.mockRestore();
        auth.deleteUser.mockRestore();
    });

    beforeAll(async () => {
        const userDocumentRef = database.doc(`/users/123456`);
        await userDocumentRef.set({
            id: '123456'
        });
    });

    it('should error if id is invalid', async () => {
        await User.remove({}, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0].message).toBe('User id is invalid');
        expect(mockDone.mock.calls[0][1]).toBe(null);
    });

    it('should remove an existing user document', async () => {
        await User.remove({ id: '123456' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(mockDone.mock.calls[0][1]).toBeDefined();

        const userDocumentRef = database.doc(`/users/123456`);
        const doc = await userDocumentRef.get();
        expect(doc.exists).toBeFalsy();
    });

});

describe('fetch', () => {

    beforeAll(async () => {
        auth.createUser = jest.fn((data) => {
            return {
                uid: data.email.split('@')[0]
            }
        });
        await User.create({ email_id: 'valid@email.com', password: 'test123' }, () => { });
        await User.create({ email_id: 'valid2@email.com', password: 'test123' }, () => { });
    });

    afterAll(async () => {
        auth.createUser.mockRestore();
        await User.remove({ id: 'valid' });
        await User.remove({ id: 'valid2' });
    });

    afterEach(() => {
        mockDone.mockRestore();
    });

    it('should error if user does not exist', async () => {
        await User.fetch({ id: '123456' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0].message).toBe('Document 123456 does not exist');
        expect(mockDone.mock.calls[0][1]).toBe(null);
    });

    it('should fetch all users', async () => {
        await User.fetch({}, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(mockDone.mock.calls[0][1]).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    email_id: 'valid@email.com'
                })
            ])
        );
        expect(mockDone.mock.calls[0][1]).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    email_id: 'valid2@email.com'
                })
            ])
        );
    });

    it('should fetch an user', async () => {
        await User.fetch({ id: 'valid' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(mockDone.mock.calls[0][1]).toEqual(
            expect.objectContaining({
                email_id: 'valid@email.com'
            })
        );
    });

});

describe('update', () => {
    beforeAll(async () => {
        auth.createUser = jest.fn((data) => {
            return {
                uid: data.email.split('@')[0]
            }
        });
        await User.create({ email_id: 'valid@email.com', password: 'test123', first_name: "Valid" }, () => { });
    });

    afterAll(async () => {
        auth.createUser.mockRestore();
        await User.remove({ id: 'valid' });
    });

    afterEach(() => {
        mockDone.mockRestore();
    });

    it('should error if user document does not exist', async () => {
        await User.update({ id: '123456' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0].message).toBe('Document 123456 does not exist');
        expect(mockDone.mock.calls[0][1]).toBe(null);
    });

    it('should update user document', async () => {
        await User.update({ id: 'valid', first_name: 'Changed' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(mockDone.mock.calls[0][1]).toEqual(
            expect.objectContaining({
                first_name: 'Changed',
                email_id: 'valid@email.com'
            })
        );
    });

    it('TEMP: should not update user email', async () => {
        await User.update({ id: 'valid', email_id: 'changed@email.com' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(mockDone.mock.calls[0][1]).toEqual(
            expect.objectContaining({
                first_name: 'Changed',
                email_id: 'valid@email.com'
            })
        );
    });
});