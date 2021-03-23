const {
    setClaims,
    restrictAccess
} = require('./auth');
const { auth } = require('../config/firebase');

let mockNext = jest.fn();

describe('setClaims', () => {

    afterEach(() => {
        mockNext.mockRestore();
        auth.verifyIdToken.mockRestore();
    });

    it('should continue if auth header is not present', async () => {
        auth.verifyIdToken = jest.fn();
        await setClaims({ headers: {} }, {}, mockNext);
        expect(auth.verifyIdToken.mock.calls.length).toBe(0);
        expect(mockNext.mock.calls.length).toBe(1);
        expect(mockNext.mock.calls[0][0]).toBeUndefined();
    });

    it('should error if token verification fails', async () => {
        auth.verifyIdToken = jest.fn(() => Promise.reject(new Error('failed')));
        await setClaims({ headers: { authorization: 'Bearer 123' } }, {}, mockNext);
        expect(auth.verifyIdToken.mock.calls.length).toBe(1);
        expect(auth.verifyIdToken.mock.calls[0][0]).toBe('123');
        expect(mockNext.mock.calls.length).toBe(1);
        expect(mockNext.mock.calls[0][0].message).toBe('failed');
    });

    it('should continue set claims on request object on successful token validation', async () => {
        let claims = { claim: true };
        auth.verifyIdToken = jest.fn(() => Promise.resolve(claims));
        let req = { headers: { authorization: 'Bearer 123' } };
        await setClaims(req, {}, mockNext);
        expect(auth.verifyIdToken.mock.calls.length).toBe(1);
        expect(auth.verifyIdToken.mock.calls[0][0]).toBe('123');
        expect(mockNext.mock.calls.length).toBe(1);
        expect(mockNext.mock.calls[0][0]).toBeUndefined();
        expect(req.claims).toEqual(claims);
    });
});

describe('restrictAccess', () => {
    let allow = ['test_super', 'test_admin'];

    afterEach(() => {
        mockNext.mockRestore();
    });

    it('should error id no claims are set on request object', () => {
        const mw = restrictAccess(allow);
        mw({}, {}, mockNext);
        expect(mockNext.mock.calls[0][0].message).toBe('User does not have permission to perform this operation');
        expect(mockNext.mock.calls[0][0].statusCode).toBe(403);
    });

    it('should error if user request does not have permission', () => {
        const mw = restrictAccess(allow);
        mw({ claims: { no_perm: true, test_super: false } }, {}, mockNext);
        expect(mockNext.mock.calls[0][0].message).toBe('User does not have permission to perform this operation');
        expect(mockNext.mock.calls[0][0].statusCode).toBe(403);
    });

    it('should not error if user request has permission', () => {
        const mw = restrictAccess(allow);
        mw({ claims: { no_perm: true, test_super: true } }, {}, mockNext);
        expect(mockNext.mock.calls[0][0]).toBeUndefined();
    });

});