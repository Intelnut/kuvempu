const functions = require('firebase-functions');
const { join } = require('path');
const { default: next } = require('next');

const isDev = process.env.NODE_ENV !== 'production';
const consumerServer = next({
    dev: isDev,
    poweredByHeader: false,
    conf: {
        distDir: './lib',
    },
});

const requestHandler = consumerServer.getRequestHandler();

const consumer = async (req, res) => {
    await consumerServer.prepare();
    return await requestHandler(req, res);
}

exports.consumer = functions.https.onRequest(consumer);
