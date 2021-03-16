/**
 * Module to generate common properties that 
 * can be consumed by both server side and client side
 */

require('dotenv').config()

const properties = {

    // C
    CONSUMER_RESOURCE_IDENTIFIER: process.env.CONSUMER_RESOURCE_IDENTIFIER

};

module.exports = properties;
