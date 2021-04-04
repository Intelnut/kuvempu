const express = require('express');
const router = express.Router();
const { validate: validateSchema } = require('../../middleware/schema');
const { restrictAccess } = require('../../middleware/auth');
const userSchema = require('./schema.json');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('./controller');

const allowedRoles = ['super_admin', 'admin'];

router.get('/schema', (req, res, next) => {
    res.status(200).json(userSchema);
});

router.get(
    '/',
    restrictAccess(allowedRoles),
    getUsers
);

router.get(
    '/:userId',
    restrictAccess(allowedRoles),
    getUser
);

router.post(
    '/',
    restrictAccess(allowedRoles),
    validateSchema({ body: userSchema }),
    createUser
);

router.put(
    '/:userId',
    restrictAccess(allowedRoles),
    validateSchema({ body: userSchema }),
    updateUser
);

router.delete(
    '/:userId',
    restrictAccess(allowedRoles),
    deleteUser
);

// TODO: implementation
router.get('/users/roles', (req, res, next) => {
    res.status(200).send('Fetch all users with privileges')
});

// TODO: implementation
router.post('/users/roles', (req, res, next) => {
    res.status(200).send('Create new privileges for a user');
});

// TODO: implementation
router.put('/users/roles/:userId', (req, res, next) => {
    res.status(200).send('Update privilages of a user');
});

// TODO: implementation
router.get('/users/roles/:userId', (req, res, next) => {
    res.status(200).send('Get capabilities of a user');
});


module.exports = router;