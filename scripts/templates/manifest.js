/**
 * Module to generate manifest.json
 */

require('dotenv').config()

const manifest = {
    name: process.env.CONSUMER_PWA_NAME,
    short_name: process.env.CONSUMER_PWA_SHORT_NAME,
    description: process.env.CONSUMER_PWA_DESCRIPTION,
    theme_color: process.env.CONSUMER_PWA_THEME_COLOR,
    background_color: process.env.CONSUMER_PWA_BACKGROUND_COLOR,
    display: process.env.CONSUMER_PWA_DISPLAY,
    start_url: process.env.CONSUMER_PWA_START_URL,
    icons: []
};

module.exports = manifest;
