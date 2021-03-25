const User = require('./model');
const { ErrorHandler } = require('../../middleware/error');
const serverEnv = require('../../environment/server.environment.json');
// get all users
const getUsers = (req, res, next) => {
    User.fetch({}, (error, users) => {
        if (error) return next(new ErrorHandler(500, error.message));
        res.status(200).json(users);
    });
}

// get specific user
const getUser = (req, res, next) => {
    const userId = req.params.userId;

    User.fetch({
        id: userId
    }, (error, users) => {
        if (error) return next(new ErrorHandler(500, error.message));
        res.status(200).json(users);
    });
}

// create new user
const createUser = (req, res, next) => {
    const data = req.body;
    User.create(data, (error, newUser) => {
        if (error) return next(new ErrorHandler(500, error.message));
        res.status(200).json(newUser);
    });
}

// create new user
const createSA = (req, res, next) => {
    User.create({
        email_id: serverEnv.SUPER_ADMIN_EMAIL_ID,
        password: serverEnv.SUPER_ADMIN_PASSWORD,
        claims: {
            super_admin: true
        }
    }, (error, newUser) => {
        if (error) return next(new ErrorHandler(500, error.message));
        res.status(200).json({ success: true });
    });
}

// update an existing user
const updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const data = req.body;
    data.id = userId;
    User.update(data, (error, updatedData) => {
        if (error) return next(new ErrorHandler(500, error.message));
        res.status(200).json(updatedData);
    });
}

// delete an existing user
const deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.remove({ id: userId }, (error, updatedData) => {
        if (error) return next(new ErrorHandler(500, error.message));
        res.status(200).json(updatedData);
    });
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    createSA
}