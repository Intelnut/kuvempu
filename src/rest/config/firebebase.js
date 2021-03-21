
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serverProps = require('../../common/server.properties.json');
const commonProps = require('../../common/common.properties.json');

admin.initializeApp({
    credential: admin.credential.cert(serverProps.FIREBASE_SERVICE_ACCOUNT),
    databaseURL: commonProps.FIREBASE_CONFIG.databaseURL,
    storageBucket: commonProps.FIREBASE_CONFIG.storageBucket
});

const database = admin.firestore();

module.exports = { database, functions };