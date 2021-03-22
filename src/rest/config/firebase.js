
const firebase = require('firebase');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serverEnv = require('../../environment/server.environment.json');
const commonEnv = require('../../environment/common.environment.json');

firebase.initializeApp(commonEnv.FIREBASE_CONFIG);

admin.initializeApp({
    credential: admin.credential.cert(serverEnv.FIREBASE_SERVICE_ACCOUNT),
    databaseURL: commonEnv.FIREBASE_CONFIG.databaseURL,
    storageBucket: commonEnv.FIREBASE_CONFIG.storageBucket
});

const database = admin.firestore();
const auth = admin.auth();

module.exports = { auth, database, firebase, functions };