
const server = require('./config/server');
const { functions } = require('./config/firebebase');
const { validationErrorHandler: schemaValidationErrorHandler } = require('./middleware/schema');

// users route
const userRoute = require('./users/route');
server.use('/users', userRoute);

// middleware
server.use(schemaValidationErrorHandler);

exports.rest = functions.https.onRequest(server);
