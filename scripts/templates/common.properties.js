/**
 * Module to generate common properties that 
 * can be consumed by both server side and client side
 */

require('dotenv').config()

const properties = {

    // C
    CONSUMER_URL: process.env.CONSUMER_URL

};

module.exports = properties;
