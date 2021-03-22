const {
    Validator
} = require("express-json-validator-middleware");

const { validate } = new Validator();

module.exports = {
    validate
}