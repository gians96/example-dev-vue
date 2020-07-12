const VuetifyLoader = require('vuetify-loader/lib/plugin');

module.exports = {
    css: {
        extract: false,
    },
    configureWebpack: {
        plugins: [new VuetifyLoader()],
    },
};
