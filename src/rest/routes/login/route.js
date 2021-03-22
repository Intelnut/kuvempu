const express = require('express');
const router = express.Router();
const { validate: validateSchema } = require('../../middleware/schema');
const loginSchema = require('./schema.json');