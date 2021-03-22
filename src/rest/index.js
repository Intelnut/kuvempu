const server = require('./config/server');
const { functions } = require('./config/firebase');
const { appErrorHandler } = require('./middleware/error');

// users route
const userRoute = require('./routes/users/route');
server.use('/users', userRoute);

// generic error handler
server.use(appErrorHandler);

exports.rest = functions.https.onRequest(server);
