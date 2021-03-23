const { auth, database } = require('../../config/firebase');
const serverProperties = require('../../environment/server.environment.json');
const { create: createUser } = require('../users/model');

const create = async (data, done) => {
    try {
        if (data.setup) {
            // create super admin user
            // when the admin app is instantiated for the first time
            // ToDo: Should this be part of /users or a /setup route? TBD in near future
            await createUser({
                email_id: serverProperties.SUPER_ADMIN_EMAIL_ID,
                password: serverProperties.SUPER_ADMIN_PASSWORD
            }, async (error, user) => {
                if (error) return done(error, null);
                await auth.setCustomUserClaims(user.id, { super_admin: true });
                done(null, user);
            });
        } else {
            done(null, { status: "TODO" });
        }
        return true;
    } catch (error) {
        done(error, null);
    }
}

module.exports = {
    create
}