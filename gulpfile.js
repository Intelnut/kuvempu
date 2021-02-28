const run = require('gulp-run-command').default;

/**
 *
 * `gulp dev`
 *
 * Run local Next.js development server
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

/**
 *
 * `gulp build`
 *
 * Build Next.js production application
 *
 */

const build = async (done) => {
    try {
        await run('next build src/')();
        done();
    } catch (error) {
        done(error);
    }
}

exports.build = build;