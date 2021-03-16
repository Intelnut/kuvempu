/**
 * Module to generate manifest.json
 */

require('dotenv').config()

const manifest = {
    name: process.env.APPLICATION_NAME,
    short_name: process.env.APPLICATION_SHORT_NAME,
    description: process.env.APPLICATION_DESCRIPTION,
    theme_color: process.env.APPLICATION_THEME_COLOR,
    background_color: process.env.APPLICATION_BACKGROUND_COLOR,
    display: process.env.APPLICATION_DISPLAY,
    start_url: process.env.APPLICATION_START_URL,
    icons: []
};

module.exports = manifest;
