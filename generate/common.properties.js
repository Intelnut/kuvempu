/**
 * Module to generate common properties that 
 * can be consumed by both server side and client side
 */

require('dotenv').config()

const properties = {

    // A
    APPLICATION_URL: process.env.APPLICATION_URL,

};

module.exports = properties;
