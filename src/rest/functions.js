const express = require('express');
const functions = require('firebase-functions');

const rest = express();
rest.all('/test', (req, res) => {
    res.JSON({
        message: "Hello World"
    });
});

exports.rest = functions.https.onRequest(rest);
