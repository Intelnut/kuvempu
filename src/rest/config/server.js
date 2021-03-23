const express = require('express');
const cors = require('cors');
const { setClaims } = require('../middleware/auth');

const server = express();

// set application level middlewares
server.use(cors()); //TODO: Whitelist env
server.use(express.json());
server.use(express.urlencoded());
server.use(express.urlencoded());
server.use(setClaims);

module.exports = server;