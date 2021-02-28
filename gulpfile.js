require('dotenv').config();

const commonProps = require('./generate/common.properties');
const fs = require('fs');
const run = require('gulp-run-command').default;
const propertiesPath = './src/properties';

/**
 * 
 * `gulp properties`
 * 
 * Save the properties module output as json 
 * for consumption by server and client
 * 
 * JSON files generated should not be committed to the codebase
 * Modify generate/*.properties.js to add more properties
 * 
 */

const generateCommonProperties = (done) => {
    const filePath = `${propertiesPath}/common.properties.json`;
    const value = JSON.stringify(commonProps, null, 2);
    try {
        fs.writeFile(filePath, value, done);
    } catch (error) {
        done(error);
    }
}
exports.properties = generateCommonProperties;

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