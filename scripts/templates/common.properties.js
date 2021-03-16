/**
 * Module to generate common properties that 
 * can be consumed by both server side and client side
 */

require('dotenv').config()

const properties = {

    // A
    APPLICATION_URL: process.env.APPLICATION_URL,
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    APPLICATION_SHORT_NAME: process.env.APPLICATION_SHORT_NAME,
    APPLICATION_DESCRIPTION: process.env.APPLICATION_DESCRIPTION,

    // C
    CONSUMER_URL: process.env.CONSUMER_URL,

};

module.exports = properties;
