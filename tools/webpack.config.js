var production = require('./webpack.production')
var development = require('./webpack.development')

const DEV_ENV = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production'

module.exports = function(env) {
    return DEV_ENV ? production(env) : development
} 