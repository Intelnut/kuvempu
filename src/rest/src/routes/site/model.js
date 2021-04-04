const { database } = require('../../config/firebase');

const create = async (data, done) => {
    try {
        const siteDocumentRef = database.doc(`/settings/site`);
        const siteDocument = await siteDocumentRef.get();

        if (siteDocument.exists) {
            done(new Error('Site settings already exist'), null);
        } else {
            await siteDocumentRef.set(data);
            done(null, data);
        }

    } catch (error) {
        done(error, null);
    }
}

const fetch = async (data, done) => {
    try {
        const siteDocumentRef = database.doc(`/settings/site`);
        const siteDocument = await siteDocumentRef.get();

        if (siteDocument.exists) {
            done(null, siteDocument.data());
        } else {
            done(new Error('Site settings does not exist'), null);
        }
    } catch (error) {
        done(error, null);
    }
}

const update = async (data, done) => {
    try {
        const siteDocumentRef = database.doc(`/settings/site`);
        await siteDocumentRef.set(data, { merge: true });

        done(null, data);
    } catch (error) {
        done(error, null);
    }
}

module.exports = {
    create,
    fetch,
    update
}