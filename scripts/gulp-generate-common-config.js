/**
 * Gulp task to generate configuration files to be consumed across the apps
 */

const fs = require('fs');

const commonPropertiesObject = require('./templates/common.properties');
const commonPath = './src/common';

// generate common.properties.json shared across client and server
const generateCommonProperties = (done) => {
    const filePath = `${commonPath}/common.properties.json`;
    const value = JSON.stringify(commonPropertiesObject, null, 2);
    try {
        fs.writeFile(filePath, value, done);
    } catch (error) {
        done(error);
    }
}


module.exports = generateCommonProperties;