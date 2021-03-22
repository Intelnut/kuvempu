const express = require('express');
const router = express.Router();
const { validate: validateSchema } = require('../../middleware/schema');
const loginSchema = require('./schema.json');

const {
    loginUser
} = require('./controller');

router.post('/', validateSchema({ body: loginSchema }), loginUser);

router.get('/schema', (req, res) => {
    res.status(200).json(loginSchema);
});