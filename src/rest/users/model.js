// TODO: firestore service, photo updation

const { auth, database } = require('../config/firebase');

// use dicebear service for default photo url on user creation
const getPlaceholderAvatar = (seed) => {
    return `https://avatars.dicebear.com/api/initials/${seed}.svg`
}

// TODO: helpers
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email && email.match(emailRegEx);
};

// TODO: helpers
const validateAuth = (data) => {
    let errors = [];

    if (!data.email_id || !isEmail(data.email_id)) {
        errors.push('Email id is invalid');
    }

    if (!data.password) {
        errors.push('Password is invalid');
    }

    return {
        errors,
        valid: errors.length === 0
    };
};

// handle user creation
const create = async (data, done) => {
    try {
        let error;
        // email id and password is required for user creation
        // terminate if validation fails
        const { errors, valid } = validateAuth(data);
        if (!valid) {
            error = new Error(errors.join(' & '));
            done(error, null);
            return error;
        }

        // very unlikely to receive a photo url on user creation
        // use an avatar as placeholder, if not provided
        data.photo_url = data.photo_url || getPlaceholderAvatar(data.email_id.split('@')[0]);

        // create new user with the data provided
        let userAuthData = {
            email: data.email_id,
            password: data.password,
            photoURL: data.photo_url
        };
        //console.log('auth', auth)
        let newUser = await auth.createUser(userAuthData);

        // assign id to the data object for document creation
        data.id = newUser.uid;

        // password should not be part of the user document
        delete data.password;

        // create new user document
        const userDocumentRef = database.doc(`/users/${data.id}`);
        await userDocumentRef.set(data);

        // successful operation
        done(null, data);
        return true;
    } catch (error) {
        done(error, null);
    }
}

// handle user deletion
// TODO: incomplete (check auth method and remove user accordingly. not all users use email auth)
const remove = async (data, done) => {
    try {

        if (!data.id) {
            done(new Error('User id is invalid'), null);
            return false;
        }

        const userDocumentRef = database.doc(`/users/${data.id}`);

        let response = await userDocumentRef.delete();

        // successful operation
        done(null, response);
        return true;
    } catch (error) {
        done(error, null);
    }
}

// handle user retrieval
const fetch = async (data, done) => {

    try {
        let error;
        if (data.id) {

            // fetch a specific user document
            const userDocumentRef = database.doc(`/users/${data.id}`);
            const userDocument = await userDocumentRef.get();

            // terminate if the document does not exist
            if (!userDocument.exists) {
                error = new Error(`Document ${data.id} does not exist`);
                done(error, null);
                return error;
            }

            // successful operation
            done(null, userDocument.data());
            return true;
        } else {

            // fetch the entire user collection
            // TODO: limit
            const userCollectionRef = database.collection(`/users`);
            const userCollection = await userCollectionRef.get();
            // create a map of user documents
            const users = userCollection.docs.map((doc) => {
                return doc.data();
            });

            // successful operation
            done(null, users);
            return true;
        }

    } catch (error) {
        done(error, null);
    }

}

// handle user updation
const update = async (data, done) => {
    try {
        let error;
        // create references for user document to be updated
        const userDocumentRef = database.doc(`/users/${data.id}`);
        const userDocumentData = await userDocumentRef.get();

        // terminate if user document does not exist in firestore
        // else the api will create a new document with the id provided
        if (!userDocumentData.exists) {
            error = new Error(`Document ${data.id} does not exist`);
            done(error, null);
            return error;
        }

        // TODO: incomplete (consumer users) (on updating email id create new auth and user document)
        // TODO: handle similar scenario for phone number update, if auth method is phone
        // TODO: same applies to remove
        if (data.email_id) {
            delete data.email_id;
        }

        // merge data with existing document
        await userDocumentRef.set(data, { merge: true });

        // fetch the updated document
        const updatedDoc = await userDocumentRef.get();

        // successful operation
        done(null, updatedDoc.data());
        return true;
    } catch (error) {
        done(error, null);
    }
}

module.exports = {
    create,
    fetch,
    remove,
    update
}