/**
 * Module to generate firebase.json
 */

const firebase = (target) => {
    const config = {
        hosting: {
            target: target,
            public: "./public",
            ignore: [
                "firebase.json",
                "**/.*",
                "**/node_modules/**"
            ],
            rewrites: [
                {
                    "source": "**",
                    "function": target
                }
            ]
        },
        functions: {
            "source": ".",
            "runtime": "nodejs12"
        }
    }

    return config;
};

module.exports = firebase;