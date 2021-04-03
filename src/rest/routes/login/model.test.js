require('firebase-functions-test')();
const { firebase } = require('../../config/firebase');
const Login = require('./model');

describe('create', () => {
    let mockDone;
    beforeEach(() => {
        mockDone = jest.fn();
    });

    afterEach(() => {
        mockDone.mockRestore();
        firebase.auth.mockRestore();
    });

    it('should authenticate with user credentials', async () => {
        let signedInWith;
        firebase.auth = jest.fn(() => {
            return {
                signInWithEmailAndPassword: (email, password) => {
                    signedInWith = {
                        email,
                        password
                    }
                    return Promise.resolve({
                        user: {
                            getIdToken: () => {
                                return 'ABCD'
                            },
                            getIdTokenResult: () => {
                                return {}
                            }
                        }
                    })
                },
            }
        });
        let cred = { email_id: 'valid@email.com', password: '123456' };
        await Login.create(cred, mockDone);
        expect(mockDone.mock.calls.length).toBe(1);
        expect(firebase.auth.mock.calls.length).toBe(1);
        //console.log(firebase.auth().signInWithEmailAndPassword.mock.calls);
        expect(signedInWith).toEqual({
            email: cred.email_id,
            password: cred.password
        });
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(mockDone.mock.calls[0][1]).toEqual({ token: 'ABCD' });
    });

    it('should error if authentication fails', async () => {
        firebase.auth = jest.fn(() => {
            return {
                signInWithEmailAndPassword: (email, password) => {
                    throw new Error('auth failed');
                },
            }
        });
        let cred = { email_id: 'valid@email.com', password: '123456' };
        await Login.create(cred, mockDone);
        expect(mockDone.mock.calls[0][0].message).toBe('auth failed');
        expect(mockDone.mock.calls[0][1]).toBe(null);
    });

});