/**
 * Module to generate common properties that 
 * can be consumed by both server side and client side
 */

require('dotenv').config()

const properties = {

    // C
    CONSUMER_RESOURCE_ID: process.env.CONSUMER_RESOURCE_ID,

    // R
    REST_RESOURCE_ID: process.env.REST_RESOURCE_ID
};

module.exports = properties;
