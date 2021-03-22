const User = require('./model');

// get all users
const getUsers = (req, res) => {
    User.fetch({}, (error, users) => {
        if (error) return res.status(500).send(error.message);
        res.status(200).json(users);
    });
}

// get specific user
const getUser = (req, res) => {
    const userId = req.params.userId;

    User.fetch({
        id: userId
    }, (error, users) => {
        if (error) return res.status(500).send(error.message);
        res.status(200).json(users);
    });
}

// create new user
const createUser = (req, res) => {
    const data = req.body;

    User.create(data, (error, newUser) => {
        if (error) return res.status(500).send(error.message);
        res.status(200).json(newUser);
    });
}

// update an existing user
const updateUser = (req, res) => {
    const userId = req.params.userId;
    const data = req.body;
    data.id = userId;
    User.create(data, (error, updatedData) => {
        if (error) return res.status(500).send(error.message);
        res.status(200).json(updatedData);
    });
}

// delete an existing user
const deleteUser = (req, res) => {
    const userId = req.params.userId;
    User.remove({ id: userId }, (error, updatedData) => {
        if (error) return res.status(500).send(error.message);
        res.status(200).json(updatedData);
    });
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}