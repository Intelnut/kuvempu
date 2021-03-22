const express = require('express');
const router = express.Router();
const { validate: validateSchema } = require('../../middleware/schema');
const userSchema = require('./schema.json');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('./controller');

router.get('/schema', (req, res, next) => {
    res.status(200).json(userSchema);
});

// TODO: Middleware (Admin only)
router.get('/', getUsers);

// TODO: Middleware (Owner or Admin only)
router.get('/:userId', getUser);

// TODO: Middleware (Owner or Admin only)
router.post('/', validateSchema({ body: userSchema }), createUser);

// TODO: Middleware (Owner or Admin only)
router.put('/:userId', validateSchema({ body: userSchema }), updateUser);

// TODO: Middleware (Owner or Admin only)
router.delete('/:userId', deleteUser);

module.exports = router;