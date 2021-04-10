/**
 * Module to generate common properties that 
 * can be consumed by both server side and client side
 */

require('dotenv').config()

const properties = (app) => {
    return {

        // C
        ADMIN_HOSTING_SITE: process.env.ADMIN_HOSTING_SITE,

        // C
        CONSUMER_HOSTING_SITE: process.env.CONSUMER_HOSTING_SITE,

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
        REST_HOSTING_SITE: process.env.REST_HOSTING_SITE,

        // S
        SUPER_ADMIN_EMAIL_ID: process.env.SUPER_ADMIN_EMAIL_ID,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD, //TODO: Encrypt
        SITE_NAME: process.env.SITE_NAME,
        SITE_DESCRIPTION: process.env.SITE_DESCRIPTION
    }
};

module.exports = properties;
