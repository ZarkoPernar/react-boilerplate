module.exports = {
    APP_PATH: './src',
    SERVER_APP_PATH: './server',

    CLIENT_ENTRY_FILE: '/index.js',
    CLIENT_OUTPUT_PATH: 'public',

    HtmlWebpackPlugin: {
        title: 'React Boilerplate',
        template: './src/index.html',
    },

    WEBPACK_DEV_SERVER_CONFIG: {
        port: process.env.PORT || 8080,
        host: 'localhost',
        stats: 'errors-only',
        historyApiFallback: true,
        hot: true,    

        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    },
}
