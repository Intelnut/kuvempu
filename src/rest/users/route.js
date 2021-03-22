const express = require('express');
const router = express.Router();
const { validate: validateSchema } = require('../middleware/schema');
const userSchema = require('./user.json');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('./controller');

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

router.get('/schema', (req, res) => {
    res.status(200).json(userSchema);
})

module.exports = router;