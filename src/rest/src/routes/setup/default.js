const serverEnv = require('../../environment/server.environment.json');

const {
    SUPER_ADMIN_EMAIL_ID: email_id,
    SUPER_ADMIN_PASSWORD: password,
    SITE_NAME: name,
    SITE_DESCRIPTION: description
} = serverEnv;

module.exports = {
    email_id,
    password,
    name,
    description
};