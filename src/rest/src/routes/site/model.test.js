require('firebase-functions-test')();
const { database } = require('../../config/firebase');
const Site = require('./model');
const mockDone = jest.fn((error, data) => { });

describe('create', () => {

    afterEach(() => {
        mockDone.mockRestore();
        database.doc.mockRestore();
    });

    it('should error if operation failed', async () => {
        let data = { settings: true };
        database.doc = jest.fn(() => {
            throw new Error('failed');
        });
        await Site.create(data, mockDone);
        expect(mockDone.mock.calls[0][0].message).toBe('failed');
    });

    it('should create a new site setting document', async () => {
        let whatWasSet;
        let whichDocument;
        database.doc = jest.fn((docPath) => {
            whichDocument = docPath;
            return {
                set: jest.fn((data, option) => { whatWasSet = { data, option } }),
                get: () => {
                    return {
                        exists: false
                    }
                }
            }
        });

        let data = { settings: true };
        await Site.create(data, mockDone)
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(whichDocument).toBe('/settings/site');
        expect(whatWasSet.data).toEqual(data);
        expect(whatWasSet.option).toBeUndefined();
    });
});

describe('fetch', () => {

    afterEach(() => {
        mockDone.mockRestore();
        database.doc.mockRestore();
    });

    it('should error if document does not exist', async () => {
        let data = { settings: true };
        database.doc = jest.fn(() => {
            return {
                get: () => {
                    return {
                        exists: false
                    }
                }
            }
        });
        await Site.fetch(data, mockDone);
        expect(mockDone.mock.calls[0][0].message).toBe('Site settings does not exist');
        expect(mockDone.mock.calls[0][1]).toBe(null);
    });

    it('should retrieve site setting document data', async () => {
        let whichDocument;
        let siteSettings = { settings: true }
        database.doc = jest.fn((docPath) => {
            whichDocument = docPath;
            return {
                get: () => {
                    return {
                        exists: true,
                        data: () => siteSettings
                    }
                }
            }
        });

        await Site.fetch({}, mockDone);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(mockDone.mock.calls[0][1]).toEqual(siteSettings);
        expect(whichDocument).toBe('/settings/site')
    });
});

describe('update', () => {

    afterEach(() => {
        mockDone.mockRestore();
        database.doc.mockRestore();
    });

    it('should error if any operation fails', async () => {
        let data = { settings: true };
        database.doc = jest.fn(() => {
            throw new Error('failed');
        });
        await Site.update(data, mockDone);
        expect(mockDone.mock.calls[0][0].message).toBe('failed');
    });

    it('should update a site setting document', async () => {
        let whatWasSet;
        let whichDocument;
        database.doc = jest.fn((docPath) => {
            whichDocument = docPath;
            return {
                set: jest.fn((data, option) => { whatWasSet = { data, option } })
            }
        });

        let data = { settings: true };
        await Site.update(data, mockDone)
        expect(mockDone.mock.calls.length).toBe(1);
        expect(mockDone.mock.calls[0][0]).toBe(null);
        expect(whichDocument).toBe('/settings/site');
        expect(whatWasSet.data).toEqual(data);
        expect(whatWasSet.option).toEqual({ merge: true });
    });
});