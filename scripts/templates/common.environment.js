/**
 * Module to generate common properties that 
 * can be consumed by both server side and client side
 */

require('dotenv').config()

const properties = (app) => {
    return {
        // A
        ADMIN_URL: process.env.ADMIN_URL,

        // C
        CONSUMER_URL: process.env.CONSUMER_URL,

        // F
        FIREBASE_CONFIG: {
            apiKey: process.env.FIREBASE_CONFIG_API_KEY,
            appId: process.env[`${app.toUpperCase()}_FIREBASE_CONFIG_APP_ID`],
            authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
            messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
            measurementId: process.env[`${app.toUpperCase()}_FIREBASE_CONFIG_MEASUREMENT_ID`],
            projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
            storageBucket: process.env.FIREBASE_CONFIG_STORAGE_BUCKET
        },

        // R
        REST_URL: process.env.REST_URL
    }
};

module.exports = properties;
