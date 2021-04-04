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
        database.doc.mockRestore();
    });

    it('should create a new user', async () => {
        let whatWasSet;
        let whichDocument;
        database.doc = jest.fn((docPath) => {
            whichDocument = docPath;
            return {
                set: jest.fn((data, option) => { whatWasSet = { data, option } }),
            }
        });

        await User.create({ email_id: 'valid@email.com', password: 'test123', phone_number: '+123', email_verified: false }, mockDone);

        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(auth.createUser.mock.calls.length).toBe(1);
        expect(auth.createUser.mock.calls[0][0]).toEqual({
            email: 'valid@email.com',
            password: 'test123',
            photoURL: 'https://avatars.dicebear.com/api/initials/valid.svg',
            emailVerified: false,
            phoneNumber: '+123',
            disabled: false
        });
        expect(mockDone.mock.calls[0][1]).toEqual({
            email_id: 'valid@email.com',
            email_verified: false,
            id: '123456',
            photo_url: 'https://avatars.dicebear.com/api/initials/valid.svg',
            phone_number: '+123',
        });

        expect(whatWasSet.data).toEqual({
            email_id: 'valid@email.com',
            phone_number: '+123',
            email_verified: false,
            photo_url: 'https://avatars.dicebear.com/api/initials/valid.svg',
            id: '123456'
        });
        expect(whichDocument).toBe('/users/123456');
    });

});

describe('remove', () => {

    beforeEach(() => {
        auth.deleteUser = jest.fn();
    });

    afterEach(() => {
        mockDone.mockRestore();
        auth.deleteUser.mockRestore();
        database.doc.mockRestore();
    });

    it('should error if id is invalid', async () => {
        database.doc = jest.fn();
        await User.remove({}, mockDone);

        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0].message).toBe('User id is invalid');
        expect(mockDone.mock.calls[0][1]).toBe(null);
        expect(database.doc.mock.calls.length).toBe(0);
    });

    it('should remove an existing user document', async () => {
        let docWasRemoved;
        let whichDocument;

        database.doc = jest.fn((docPath) => {
            whichDocument = docPath;
            return {
                delete: jest.fn(() => { docWasRemoved = true; return true }),
            }
        });

        await User.remove({ id: '123456' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(mockDone.mock.calls[0][1]).toBeDefined();
        expect(whichDocument).toBe('/users/123456');
        expect(docWasRemoved).toBeTruthy();
    });

});

describe('fetch', () => {

    beforeAll(async () => {
        auth.createUser = jest.fn((data) => {
            return {
                uid: data.email.split('@')[0]
            }
        });
    });

    afterAll(async () => {
        auth.createUser.mockRestore();
    });

    afterEach(() => {
        mockDone.mockRestore();
    });

    it('should error if user does not exist', async () => {
        let whichDocument;
        database.doc = jest.fn((docPath) => {
            whichDocument = docPath;
            return {
                get: () => {
                    return {
                        exists: false
                    }
                }
            }
        });
        await User.fetch({ id: '123456' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0].message).toBe('Document 123456 does not exist');
        expect(mockDone.mock.calls[0][1]).toBe(null);
        expect(whichDocument).toBe('/users/123456');
    });

    it('should fetch all users', async () => {
        let whichDocument;
        database.collection = jest.fn((docPath) => {
            whichDocument = docPath;
            return {
                get: () => {
                    return {
                        docs: [
                            { data() { return { id: 123 } } },
                            { data() { return { id: 234 } } }
                        ]
                    }
                }
            }
        });

        await User.fetch({}, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(mockDone.mock.calls[0][1]).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 123
                })
            ])
        );
        expect(mockDone.mock.calls[0][1]).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 234
                })
            ])
        );

        database.collection.mockRestore()
    });

    it('should fetch an user', async () => {
        database.doc = jest.fn((docPath) => {
            return {
                get: () => {
                    return {
                        exists: true,
                        data() { return { id: 123 } }
                    }
                }
            }
        });

        await User.fetch({ id: 'valid' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(mockDone.mock.calls[0][1]).toEqual(
            expect.objectContaining({
                id: 123
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
    });

    afterAll(async () => {
        auth.createUser.mockRestore();
    });

    beforeEach(() => {
        auth.updateUser = jest.fn(() => {
            return {
                uid: '123456'
            }
        });
    });

    afterEach(() => {
        auth.updateUser.mockRestore();
        mockDone.mockRestore();
        database.doc.mockRestore();
    });

    it('should error if user document does not exist', async () => {
        database.doc = jest.fn((docPath) => {
            return {
                get: () => {
                    return {
                        exists: false
                    }
                }
            }
        });

        await User.update({ id: '123456' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0].message).toBe('Document 123456 does not exist');
        expect(mockDone.mock.calls[0][1]).toBe(null);
    });

    it('should update user document', async () => {
        let whatWasSet;
        database.doc = jest.fn((docPath) => {
            return {
                set: (data, option) => {
                    whatWasSet = { data, option }
                },
                get: () => {
                    return {
                        exists: true,
                        data() { return { id: 123 } }
                    }
                }
            }
        });

        await User.update({ id: 'valid', first_name: 'Changed', email_id: 'changed@email.com' }, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(auth.updateUser.mock.calls[0][0]).toBe('valid');
        expect(auth.updateUser.mock.calls[0][1]).toEqual({
            disabled: false,
            email: "changed@email.com"
        });
        expect(mockDone.mock.calls[0][1]).toEqual(
            expect.objectContaining({ id: 123 })
        );
        expect(whatWasSet).toEqual({
            data: { id: 'valid', first_name: 'Changed', email_id: 'changed@email.com' },
            option: { merge: true }
        });
    });
});