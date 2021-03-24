//TODO: Script template for initial setup (Consumer & Admin)
const functions = require('firebase-functions');
const { default: next } = require('next');

const isDev = process.env.NODE_ENV !== 'production';
const app = next({
    dev: isDev,
    poweredByHeader: false,
    conf: {
        distDir: './lib',
    },
});

const requestHandler = app.getRequestHandler();

const server = async (req, res) => {
    await app.prepare();
    return await requestHandler(req, res);
}

exports.admin = functions.https.onRequest(server);
