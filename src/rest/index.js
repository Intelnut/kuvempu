const server = require('./config/server');
const { functions } = require('./config/firebase');
const { appErrorHandler } = require('./middleware/error');

// L

// login route
const loginRoute = require('./routes/login/route');
server.use('/login', loginRoute);

// S

// site route
const siteRoute = require('./routes/site/route');
server.use('/site', siteRoute);

// U

// users route
const userRoute = require('./routes/users/route');
server.use('/users', userRoute);

// Handle Errors
server.use(appErrorHandler);

exports.rest = functions.https.onRequest(server);
