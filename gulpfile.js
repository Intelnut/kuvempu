const run = require('gulp-run-command').default;

/**
 *
 * `gulp dev`
 *
 * Run local NextJs development server
 *
 */

const dev = async (done) => {
    try {
        await run('next src/')();
        done();
    } catch (error) {
        done(error);
    }
}

exports.dev = dev;