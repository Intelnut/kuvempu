
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serverEnv = require('../../environment/server.environment.json');
const commonEnv = require('../../environment/common.environment.json');

admin.initializeApp({
    credential: admin.credential.cert(serverEnv.FIREBASE_SERVICE_ACCOUNT),
    databaseURL: commonEnv.FIREBASE_CONFIG.databaseURL,
    storageBucket: commonEnv.FIREBASE_CONFIG.storageBucket
});

const database = admin.firestore();

module.exports = { database, functions };