const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors()); //TODO: Whitelist env
server.use(express.json());

module.exports = server;