const { firebase } = require('../../config/firebase');

const create = async (data, done) => {
    try {
        // no check required for email & password, schema validator would take care of that
        // authenticate with email and password
        const authResponse = await firebase.auth().signInWithEmailAndPassword(data.email_id, data.password);
        const token = await authResponse.user.getIdToken();
        let idTokenResult = await authResponse.user.getIdTokenResult();
        let claims = idTokenResult.claims;

        // successful operation
        done(null, { token, claims });
        return true;
    } catch (error) {
        done(error, null);
    }
}

module.exports = {
    create
}