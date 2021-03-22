/**
 * Module to generate common properties that 
 * can be consumed by both server side and client side
 */

require('dotenv').config()

const properties = {

    // C
    ADMIN_RESOURCE_ID: process.env.ADMIN_RESOURCE_ID,

    // C
    CONSUMER_RESOURCE_ID: process.env.CONSUMER_RESOURCE_ID,

    //F
    FIREBASE_SERVICE_ACCOUNT: {
        type: "service_account",
        project_id: process.env.FIREBASE_CONFIG_PROJECT_ID,
        private_key_id: process.env.FIREBASE_SA_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_SA_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_SA_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_SA_CLIENT_ID,
        auth_uri: process.env.FIREBASE_SA_AUTH_URI,
        token_uri: process.env.FIREBASE_SA_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_SA_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_SA_CLIENT_X509_CERT_URL
    },

    // R
    REST_RESOURCE_ID: process.env.REST_RESOURCE_ID,
};

module.exports = properties;
