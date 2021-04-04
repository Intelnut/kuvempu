const defaults = require('./default');
const User = require('../users/model');
const Site = require('../site/model');

// handle site setup and sa creation
const create = async (data, done) => {
    try {
        const { email_id, password, name, description } = defaults;

        const proceed = (data.email_id === email_id) && (data.password === password);

        if (!proceed) {
            done(new Error('Credentials did not match'), null);
            return;
        }

        const credentials = data;
        credentials.email_verified = true;
        credentials.claims = {
            super_admin: true
        };

        const createSiteSettings = () => {

            Site.create({ name, description }, (error, data) => {
                error && done(error, null);
                !error && done(null, { success: true });
            });
        }

        User.create(credentials, (error, users) => {
            error && done(error, null);
            !error && createSiteSettings();
        });

    } catch (error) {
        done(error, null);
    }
}

module.exports = {
    create
}